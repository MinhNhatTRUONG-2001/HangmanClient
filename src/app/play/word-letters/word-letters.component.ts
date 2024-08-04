import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-word-letters',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './word-letters.component.html',
  styleUrl: './word-letters.component.css'
})
export class WordLettersComponent implements OnChanges {
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  @Input() word!: string
  blanks!: string

  ngOnChanges(changes: SimpleChanges) {
    if (changes['words'] || this.word) {
      this.blanks = this.generateWordBlanks(this.word)
      console.log(this.word)
      console.log(this.blanks)
    }
  }
  
  checkLetter(letter: string) {
    console.log(letter)
  }

  generateWordBlanks(word: string) {
    let blanks = ''
    for (const w of word.split('')) {
      if (this.letters.includes(w.toUpperCase())) {
        blanks += '_'
      }
      else {
        blanks += w
      }
    }
    return blanks
  }
}
