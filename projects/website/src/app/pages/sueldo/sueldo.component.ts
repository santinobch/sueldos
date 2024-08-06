import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { SelectChipsComponent } from '../../components/select-chips/select-chips.component';
import { ESPECIALIZACIONES } from '../../consts/especializaciones.const';
import { PROVINCIAS } from '../../consts/provincias.const';

@Component({
  selector: 'app-sueldo',
  templateUrl: './sueldo.component.html',
  styleUrls: ['./sueldo.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatCardModule, SelectChipsComponent],
})
export class SueldoComponent implements OnInit {
  ubicacionesSelected: string[] = [];
  ubicacionesUnselected: string[] = PROVINCIAS.sort();

  tecnologiasSelected: string[] = [];
  tecnologiasUnselected: string[] = ESPECIALIZACIONES.sort();

  constructor() {}

  ubicacionSelectedEvent(ubicaciones: string[]) {
    this.ubicacionesSelected = ubicaciones;
  }

  tecnologiasSelectedEvent(tecnologias: string[]) {
    this.tecnologiasSelected = tecnologias;
  }

  ngOnInit(): void {}
}
