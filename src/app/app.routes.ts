import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GptComponent} from "./gpt/gpt.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'gpt', component: GptComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
