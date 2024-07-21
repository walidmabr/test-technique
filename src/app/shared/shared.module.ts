import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavComponent } from './nav-bar/nav.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SideBarComponent, NavComponent],
  imports: [
    CommonModule, MaterialModule, RouterModule
  ],
  exports: [
    SideBarComponent, NavComponent
  ]
})
export class SharedModule { }
