import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'ceich-coulomb-interactive',
  templateUrl: 'interactive.component.html'
})

export class CoulombInteractiveComponent implements AfterViewInit {

  @ViewChild('ruler') ruler: ElementRef;

  public width = 600;
  public height = 550;

  public chargeValue: number = 10;
  public color = 'red';

  constructor(private cdRef:ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.width = this.ruler.nativeElement.getBoundingClientRect().width;
    this.height = document.getElementById('mainContainer').getBoundingClientRect().height - 78-64;
    this.cdRef.detectChanges();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.width = this.ruler.nativeElement.getBoundingClientRect().width;
    this.height = document.getElementById('mainContainer').getBoundingClientRect().height - 78-64;
  }

  onChangeCharge(event: MatSliderChange) {
    this.chargeValue = event.value;
    this.color = event.value > 0 ? 'red' : event.value < 0 ? 'blue' : 'purple';
  }
}