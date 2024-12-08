import { Component, HostListener, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round-info',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule],
  templateUrl: './round-info.component.html',
  styleUrl: './round-info.component.css'
})
export class RoundInfoComponent {
  @Input() lives!: number
  @Input() round!: number
  @Input() topic!: string
  gridRowHeight?: string
  livesColspan?: string
  roundColspan?: string
  topicColspan?: string

  @HostListener('window:orientationchange')
  onOrientationChange() {
    if (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") {
      this.gridRowHeight = "10:6"
      this.livesColspan = "3"
      this.roundColspan = "3"
      this.topicColspan = "3"
    }
    else {
      this.gridRowHeight = "10:9"
      this.livesColspan = "2"
      this.roundColspan = "2"
      this.topicColspan = "5"
    }
  }

  constructor(private router: Router) {
    if (screen.orientation.type === "landscape-primary" || screen.orientation.type === "landscape-secondary") {
      this.gridRowHeight = "10:6"
      this.livesColspan = "3"
      this.roundColspan = "3"
      this.topicColspan = "3"
    }
    else {
      this.gridRowHeight = "10:9"
      this.livesColspan = "2"
      this.roundColspan = "2"
      this.topicColspan = "5"
    }
  }

  quitGame() {
    if(confirm('Are you sure you want to quit? Your progress will not be saved.')) {
      this.router.navigateByUrl('')
    }
  }
}
