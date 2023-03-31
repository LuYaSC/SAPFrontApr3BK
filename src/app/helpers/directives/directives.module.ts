import { NgModule } from '@angular/core';
import { EmailValidatorDirective } from './email-validator.directive';
import { OnlyLettersAndNumbersDirective } from './letters-and-numbers.directive';
import { OnlyLettersDirective } from './only-letters.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { NoAutocompleteDirective } from './no-autocomplete.directive';
import { CreditCardFormatDirective } from './credit-card-format.directive';
import { AmountBsDirective } from './amount-bs.directive';

@NgModule({
  declarations: [
    OnlyLettersAndNumbersDirective,
    OnlyLettersDirective,
    OnlyNumbersDirective,
    EmailValidatorDirective,
    NoAutocompleteDirective,
    CreditCardFormatDirective,
    AmountBsDirective
  ],
  imports: [

  ],
  exports: [
    OnlyLettersAndNumbersDirective,
    OnlyLettersDirective,
    OnlyNumbersDirective,
    EmailValidatorDirective,
    NoAutocompleteDirective,
    CreditCardFormatDirective,
    AmountBsDirective
  ]
})
export class DirectivesModule {
}
