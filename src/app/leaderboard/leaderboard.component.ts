import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { serverUrl } from '../server';
import { PlayResult } from './play-result';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, 
    MatButtonModule, MatIconModule, MatTooltipModule
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  displayedColumns: string[] = ['rank', 'playerName', 'startDatetime', 'correctWords', 'totalIncorrectGuesses', 'timePlayed']
  dataSource = new MatTableDataSource<PlayResult>()
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  searchForm = new FormGroup({
    'playerName': new FormControl(''),
    'startDate': new FormControl<Date | null>(null),
    'endDate': new FormControl<Date | null>(null),
  })
  searchType: 'top-1000' | 'search' = 'top-1000'

  constructor() {
    this.fetchLeaderboardData(this.searchType)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  totalIncorrectGuessesReduce(total: number, value: number) {
    return total + value
  }

  timePlayedConversion(startDatetime: Date, endDatetime: Date) {
    const time: number = endDatetime.getTime() - startDatetime.getTime()
    const timeInSeconds: number = Math.round(time / 1000)
    if (timeInSeconds >= 60) {
      const minutes: number = Math.floor(timeInSeconds / 60)
      const remainingSeconds: number = timeInSeconds % 60
      if (minutes >= 60) {
        const hours: number = Math.floor(minutes / 60)
        const remainingMinutes: number = minutes % 60
        return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
      }
      return `${minutes}m ${remainingSeconds}s`
    }
    return `${timeInSeconds}s`
  }

  searchResults() {
    if (!this.searchForm.value.playerName && !this.searchForm.value.startDate && !this.searchForm.value.endDate) {
      this.fetchLeaderboardData('top-1000')
    }
    else {
      this.fetchLeaderboardData('search')
    }
  }

  fetchLeaderboardData(searchType: 'top-1000' | 'search') {
    this.searchType = searchType
    let endPoint = ''
    if (searchType === 'top-1000') {
      endPoint = 'top-1000'
    }
    else if (searchType === 'search') {
      const queries = new URLSearchParams()
      if (this.searchForm.value.playerName) {
        queries.append('playerName', this.searchForm.value.playerName as string)
      }
      if (this.searchForm.value.startDate) {
        queries.append('startDateRange', this.searchForm.value.startDate.toUTCString())
      }
      if (this.searchForm.value.endDate) {
        queries.append('endDateRange', this.searchForm.value.endDate.toUTCString())
      }
      endPoint = 'search?' + queries
    }
    fetch(`${serverUrl}/leaderboard/${endPoint}`)
    .then(res => res.json())
    .then(data => {
      this.dataSource.data = data.map((result: PlayResult) => ({
        ...result,
        startDatetime: new Date(result.startDatetime),
        endDatetime: new Date(result.endDatetime)
      }))
    })
  }
}
