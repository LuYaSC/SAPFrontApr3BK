import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[noAutocomplete], textarea[noAutocomplete]'
})
export class NoAutocompleteDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.autocomplete = 'off';
  }

}
