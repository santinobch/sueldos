import { MatChipsModule } from '@angular/material/chips';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'option-chip',
  templateUrl: './option-chip.component.html',
  styleUrls: ['./option-chip.component.scss'],
  standalone: true,
  imports: [CommonModule, MatChipsModule],
})
export class SueldoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
