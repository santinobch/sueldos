import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sueldo',
  templateUrl: './sueldo.component.html',
  styleUrls: ['./sueldo.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SueldoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
