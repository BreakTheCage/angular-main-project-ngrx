import { Directive, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    //Close Dropdown only by clicking on bottom
    // @HostBinding('class.open') isOpen = false;
    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen;
    // }

    //OR
    //Close Dropdown by clicking other area in document
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef) { }
    
} 