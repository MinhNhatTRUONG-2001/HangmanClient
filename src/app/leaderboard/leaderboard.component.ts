import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { serverUrl } from '../server';
import { PlayResult } from './play-result';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  displayedColumns: string[] = ['rank', 'playerName', 'startDatetime', 'correctWords', 'totalIncorrectGuesses', 'timePlayed']
  dataSource: PlayResult[] = []

  constructor() {
    fetch(`${serverUrl}/leaderboard/top-1000`)
    .then(res => res.json())
    .then(data => {
      this.dataSource = data.map((result: PlayResult) => ({
        ...result,
        startDatetime: new Date(result.startDatetime),
        endDatetime: new Date(result.endDatetime)
      }))
    })
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
}
