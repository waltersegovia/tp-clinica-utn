import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesionalRoutingModule } from './profesional-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfesionalComponent } from './profesional.component';
import { ComponentsModule } from 'src/app/components/components.module';
//import { FormsModule } from '@angular/forms';
//import { SectionUserComponent } from '../admin/section-user/section-user.component';


@NgModule({
  declarations: [
    //SectionUserComponent,
    HomeComponent,
    ProfesionalComponent
  ],
  imports: [
    CommonModule,
    ProfesionalRoutingModule,
    ComponentsModule,
    //FormsModule
  ]
})
export class ProfesionalModule { }
