import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirectve } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirectve,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirectve,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [
      AlertComponent
    ]
})
export class SharedModule {

}