import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAmountBs]'
})
export class AmountBsDirective {
  private readonly suffix = ' Bs.';

  constructor(private el: ElementRef<HTMLInputElement>) {
    el.nativeElement.value = '';
  }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const numericValue = input.value.replace(this.suffix, '').replace(/[^0-9]/g, '');
    const maxLength = 4;
    const truncatedValue = numericValue.slice(0, maxLength);
    input.value = truncatedValue + (truncatedValue ? this.suffix : '');
  }
}
