import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'task',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule)
  },

  {
    path: 'berechtigung',
    loadChildren: () => import('./pages/berechtigung/berechtigung.module').then(m => m.BerechtigungPageModule)
  },
  {
    path: 'name',
    loadChildren: () => import('./pages/name-eingeben/name-eingeben.module').then(m => m.NameEingebenPageModule)
  },
  {
    path: 'endpage',
    loadChildren: () => import('./pages/endpage/endpage.module').then(m => m.EndpagePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
