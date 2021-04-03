import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestsListContainerComponent } from './containers/guests-list-container/guests-list-container.component';
import { GuestsDetailsContainerComponent } from './containers/guests-details-container/guests-details-container.component';

const routes: Routes = [
  {
    path: '',
    component: GuestsListContainerComponent
  },
  {
    path: ':id',
    component: GuestsDetailsContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestsRoutingModule { }
