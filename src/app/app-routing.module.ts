import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaligaComponent } from './laliga/laliga.component';
import { GithubComponent } from './github/github.component';

const routes: Routes = [
  {path:'laliga',component:LaligaComponent},
  {path:'github',component:GithubComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeComponent = [LaligaComponent,GithubComponent]
