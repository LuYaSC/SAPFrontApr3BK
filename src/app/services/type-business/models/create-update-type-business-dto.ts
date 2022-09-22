export class CreateUpdateTypeBusinessDto {
  id: number = 0;
  description: string = '';
  initial: string = '' ;
  isDisabled: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
