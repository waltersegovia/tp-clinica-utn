import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SectionUserComponent } from './section-user/section-user.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdminComponent } from './admin.component';
import { FormUserComponent } from './form-user/form-user.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SectionUserComponent,
    AdminComponent,
    FormUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class AdminModule { }
