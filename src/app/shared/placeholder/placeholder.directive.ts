import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirectve {
    constructor(public viewContainerRef: ViewContainerRef){}
}