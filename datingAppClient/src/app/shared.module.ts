import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    BrowserAnimationsModule,
    BsDropdownModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
