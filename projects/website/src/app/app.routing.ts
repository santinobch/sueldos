import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SueldoComponent } from './pages/sueldo/sueldo.component';

const routes: Routes = [
  {
    path: '',
    component: SueldoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
