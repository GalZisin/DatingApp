import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot()
  ],
  exports: [
    BrowserAnimationsModule,
    BsDropdownModule,
    ToastrModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
