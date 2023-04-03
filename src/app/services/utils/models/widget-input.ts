export class WidgetInput {
  value1: number;
  title1: string;
  type1: string;
  amount1: number;
  color1: string;
  isVisible1: boolean = true;

  value2: number;
  title2: string;
  type2: string;
  amount2: number;
  color2: string;
  isVisible2: boolean = true;

  value3: number;
  title3: string;
  type3: string;
  amount3: number;
  color3: string;
  isVisible3: boolean = true;

  value4: number;
  title4: string;
  type4: string;
  amount4: number;
  color4: string;
  isVisible4: boolean = true;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
