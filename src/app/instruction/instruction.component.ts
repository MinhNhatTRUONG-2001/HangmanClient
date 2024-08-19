import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instruction',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css'
})
export class InstructionComponent {
  constructor(private router: Router) {}

  backToMainMenu() {
    this.router.navigateByUrl('')
  }
}
