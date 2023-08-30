import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { MeetingComponent } from './meeting/meeting.component';

const routes: Routes = [
  { 
    path: '',   
    redirectTo: '/clients', 
    pathMatch: 'full' 
  },
  {
    path:'clients',
    title: 'Clients',
    component:ClientComponent
  },
  {
    path:'meetings',
    title: 'Meetings',
    component:MeetingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
