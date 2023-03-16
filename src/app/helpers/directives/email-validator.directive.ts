import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmailValidator]'
})
export class EmailValidatorDirective {

  private regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    if (value && !this.regex.test(value)) {
      this.el.nativeElement.classList.add('invalid-email');
    } else {
      this.el.nativeElement.classList.remove('invalid-email');
    }
  }
}
