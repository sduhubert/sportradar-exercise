import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'event/:id', 
    loadComponent: () => 
      import('./event-detail/event-detail.component').then(m => m.EventDetailComponent)
  }
];