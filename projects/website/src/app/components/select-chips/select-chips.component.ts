import { MatChipListbox, MatChipOption } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import {
  OptionChipChip,
  OptionChipComponent,
  OptionChipPopup,
} from '../option-chip/option-chip.component';

@Component({
  selector: 'select-chip',
  templateUrl: './select-chips.component.html',
  styleUrls: ['./select-chips.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    OptionChipComponent,
    OptionChipPopup,
    OptionChipChip,
    MatChipListbox,
    MatChipOption,
  ],
})
export class SelectChipsComponent implements OnInit {
  _selected: string[] = [];
  _selectedText = '';

  @Input() color: string = '';
  @Input() label: string = '';
  @Input() data: string[] = [];

  @Output() selected = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void {}

  commarizeArray() {
    this._selectedText = '';
    let i = 0;

    if (this._selected.length > 0) {
      let cycles = this._selected.length - 1;

      if (cycles >= 4) cycles = 3;

      while (i <= cycles) {
        if (i <= 2) {
          this._selectedText += this._selected[i];
          if (this._selected.length - 1 > i) this._selectedText += ', ';
        } else if (this._selected.length >= 4) {
          this._selectedText += `+${this._selected.length - 3}`;
        }

        i++;
      }
    }

    return this._selectedText;
  }

  clickChip(item: string, action: string) {
    let index = -1;

    switch (action) {
      case 'select':
        index = this.data.indexOf(item);

        if (index >= 0) {
          this.data.splice(index, 1);
        }

        this._selected.push(item);

        break;

      case 'unselect':
        index = this._selected.indexOf(item);

        if (index >= 0) {
          this._selected.splice(index, 1);
        }

        this.data.push(item);

        break;

      default:
        break;
    }

    this._selected.sort();
    this.data.sort();

    this.commarizeArray();

    this.selected.emit(this._selected);
  }
}
