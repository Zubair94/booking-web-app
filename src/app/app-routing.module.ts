import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'guests'
  },
  {
    path: 'guests',
    loadChildren: () => import('./featured/guests/guests.module').then(module => module.GuestsModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./featured/booking/booking.module').then(module => module.BookingModule)
  },
  {
    path: '**',
    redirectTo: 'guests'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
