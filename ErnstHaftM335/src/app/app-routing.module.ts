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
  },  {
    path: 'task',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule)
  },
<<<<<<< HEAD
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'berechtigung',
    loadChildren: () => import('./pages/berechtigung/berechtigung.module').then(m => m.BerechtigungPageModule)
  },
  {
    path: 'name',
    loadChildren: () => import('./pages/name-eingeben/name-eingeben.module').then(m => m.NameEingebenPageModule)
  },


];
=======
>>>>>>> 7bd930e8ce6c9c6276f5fa6d8e49624518c7d109

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
