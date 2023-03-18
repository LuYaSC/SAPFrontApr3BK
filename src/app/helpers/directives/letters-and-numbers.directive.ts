import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyLettersAndNumbers]'
})
export class OnlyLettersAndNumbersDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z0-9]/g, '');
    if (this.el.nativeElement.value !== initialValue) {
      event.stopPropagation();
    }
  }

}