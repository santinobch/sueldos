import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ESPECIALIZACIONES } from '../../consts/especializaciones.const';
import { PROVINCIAS } from '../../consts/provincias.const';

@Component({
  selector: 'app-sueldo',
  templateUrl: './sueldo.component.html',
  styleUrls: ['./sueldo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
  ],
})
export class SueldoComponent implements OnInit {
  PROVINCIAS = PROVINCIAS;
  ESPECIALIZACIONES = ESPECIALIZACIONES;

  constructor() {}

  ngOnInit(): void {}
}
