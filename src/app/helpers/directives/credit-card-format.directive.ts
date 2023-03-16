import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appCreditCardFormat]'
})
export class CreditCardFormatDirective {

  constructor(private el: ElementRef) { }
  @HostListener('input', ['$event']) onInput(event: any) {
    let value = this.el.nativeElement.value;
    value = value.replace(/[^0-9]/g, '');

    if (/[^0-9-\s]+/.test(value)) {
      value = value.replace(/[^0-9-\s]+/g, '');
    }

    if (value.length > 0) {
      value = value.match(/\d{1,4}/g)?.join('-');
    }

    this.el.nativeElement.value = value;
  }
}
