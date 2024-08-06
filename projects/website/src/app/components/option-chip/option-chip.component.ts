import anime from 'animejs/lib/anime.es';

import { MatChip, MatChipsModule } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { OptionChipService } from './option-chip.service';

@Directive({
  selector: `popup, [popup]`,
  standalone: true,
})
export class OptionChipPopup {}

@Directive({
  selector: `chip, [chip]`,
  standalone: true,
})
export class OptionChipChip {}

@Component({
  selector: 'option-chip',
  templateUrl: './option-chip.component.html',
  styleUrls: ['./option-chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatChipsModule],
})
export class OptionChipComponent implements OnInit, AfterViewInit {
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public optionChipService: OptionChipService
  ) {}

  @ViewChild('chip') chip!: MatChip;
  @ViewChild('popup') popup!: ElementRef<HTMLElement>;

  public left = '0px';
  public top = '0px';
  public zIndex = 0;

  public clicked = false;
  public clickedChip = false;
  public clickedPopup = false;

  private animFadeIn = anime({});
  private animFadeOut = anime({});

  @HostListener('document:click')
  onDocumentClick() {
    this.clickDetection('HostListener');
  }

  @Input() color: string = '';

  fadeIn() {
    if (this.optionChipService.getZIndex() != this.zIndex) {
      this.optionChipService.updateZIndex();
      this.zIndex = this.optionChipService.getZIndex();
    }

    this.popup.nativeElement.style.display = 'block';
    this.animFadeOut.pause();
    this.animFadeIn = anime({
      targets: this.popup.nativeElement,
      opacity: 1,
      easing: 'easeInQuad',
      duration: 200,
    });
  }

  fadeOut() {
    if (!this.clicked) {
      this.animFadeIn.pause();
      this.animFadeOut = anime({
        targets: this.popup.nativeElement,
        opacity: 0,
        easing: 'easeInQuad',
        duration: 200,
        complete: () => {
          this.popup.nativeElement.style.display = 'none';
        },
      });
    }
  }

  clickDetection(action: string) {
    switch (action) {
      case 'HostListener':
        setTimeout(() => {
          // Clicked out of bounds
          if (!this.clickedChip && !this.clickedPopup) {
            this.clicked = false;
            this.fadeOut();
          }
          this.clickedChip = false;
          this.clickedPopup = false;
        }, 10);
        break;

      case 'chip':
        this.clickedChip = true;
        this.clicked = !this.clicked;
        break;

      case 'popup':
        this.clickedPopup = true;
        break;
    }
  }

  positionDown(element: MatChip) {
    const elRect = element._elementRef.nativeElement.getBoundingClientRect();

    this.top = `${elRect.bottom + 10}px`;

    if (window.innerWidth - elRect.left > 700) {
      this.left = `${elRect.left}px`;
    } else {
      this.left = '0px';
    }

    this.changeDetectorRef.detectChanges();
  }

  chipClasses() {
    if (!this.clicked) {
      return `!bg-${this.color}-500 !text-${this.color}-contrast-500`;
    }

    return `!bg-white !text-${this.color}-500`;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.positionDown(this.chip);
  }
}
