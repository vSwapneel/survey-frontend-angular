import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { ListAllComponent } from './list-all/list-all.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },      // Home page route
  { path: 'survey', loadComponent: () => import('./survey/survey.component').then(m => m.SurveyComponent) }, // Survey page route
  { path: 'survey/:id', loadComponent: () => import('./survey/survey.component').then(m => m.SurveyComponent)},
  { path: 'listall', loadComponent: () => import('./list-all/list-all.component').then(m => m.ListAllComponent) } // List All page route
];
