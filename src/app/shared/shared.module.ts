import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from '../about-us/about-us.component';

@NgModule({
  declarations: [
    FooterComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    AboutUsComponent,
  ]
})
export class SharedModule { }
