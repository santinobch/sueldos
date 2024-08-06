import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OptionChipService {
  constructor() {}

  private zIndex = 1;

  getZIndex() {
    console.log(this.zIndex);
    return this.zIndex;
  }

  updateZIndex() {
    this.zIndex += 1;
  }
}
