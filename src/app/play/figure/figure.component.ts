import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-figure',
  standalone: true,
  imports: [],
  templateUrl: './figure.component.html',
  styleUrl: './figure.component.css'
})
export class FigureComponent implements AfterViewInit, OnChanges {
  @Input() lives!: number
  draw!: CanvasRenderingContext2D

  constructor(private elRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const computedStyle = getComputedStyle(this.elRef.nativeElement)
    const tertiaryColor = computedStyle.getPropertyValue('--tertiary-color')

    const hangmanCanvasElement = this.elRef.nativeElement.querySelector("#hangman-figure")
    const hangmanCanvas = hangmanCanvasElement as HTMLCanvasElement
    this.draw = hangmanCanvas.getContext("2d") as CanvasRenderingContext2D

    //Draw the hang
    this.draw.strokeStyle = tertiaryColor
    this.draw.beginPath()
    this.draw.moveTo(175, 25)
    this.draw.lineTo(175, 10)
    this.draw.stroke()
    this.draw.beginPath()
    this.draw.moveTo(175, 10)
    this.draw.lineTo(75, 10)
    this.draw.stroke()
    this.draw.beginPath()
    this.draw.moveTo(75, 10)
    this.draw.lineTo(75, 150)
    this.draw.stroke()
    this.draw.beginPath()
    this.draw.moveTo(50, 150)
    this.draw.lineTo(100, 150)
    this.draw.stroke()
    this.draw.strokeStyle = "black"
  }

  ngOnChanges(changes: SimpleChanges) { //Draw the human figure based on 'lives' changes
    if (changes['lives'] && changes['lives'].currentValue !== changes['lives'].previousValue) {
      switch (this.lives) {
        case 5: //Head
          this.draw.beginPath();
          this.draw.arc(175, 40, 15, 0, 2 * Math.PI);
          this.draw.stroke();
          break;
        case 4: //Body
          this.draw.beginPath();
          this.draw.moveTo(175, 55);
          this.draw.lineTo(175, 100);
          this.draw.stroke();
          break;
        case 3: //Left arm
          this.draw.beginPath();
          this.draw.moveTo(175, 60);
          this.draw.lineTo(150, 85);
          this.draw.stroke();
          break;
        case 2: //Right arm
          this.draw.beginPath();
          this.draw.moveTo(175, 60);
          this.draw.lineTo(200, 85);
          this.draw.stroke();
          break;
        case 1: //Left leg
          this.draw.beginPath();
          this.draw.moveTo(175, 100);
          this.draw.lineTo(150, 135);
          this.draw.stroke();
          break;
        case 0: //Right leg
          this.draw.beginPath();
          this.draw.moveTo(175, 100);
          this.draw.lineTo(200, 135);
          this.draw.stroke();
          break;
      }
    }
  }
}
