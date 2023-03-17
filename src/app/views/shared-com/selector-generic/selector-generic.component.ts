import { Component, EventEmitter, Input, Output } from '@angular/core';
import {SelectOption} from './../../../helpers/global-models/select-option';

@Component({
  selector: 'app-selector-generic',
  templateUrl: './selector-generic.component.html',
  styleUrls: ['./selector-generic.component.scss']
})
export class SelectorGenericComponent {
  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() enableAllOptions: boolean = false;
  @Input() options: SelectOption[];
  @Input() selectedId: number;
  @Output() onSelected = new EventEmitter<number>();

  constructor() { }

  emitSelectedId() {
    this.onSelected.emit(this.selectedId);
  }

  onSelectedIdChange() {
    this.emitSelectedId();
  }
}
