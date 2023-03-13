import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RolesResult } from 'src/app/services/roles/models/roles-result';

@Component({
  selector: 'app-select-multiple-roles',
  templateUrl: './select-multiple-roles.component.html',
  styleUrls: ['./select-multiple-roles.component.scss']
})
export class SelectMultipleRolesComponent implements OnInit {
  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() enableAllOptions: boolean = false;
  @Input() parameterList: RolesResult[];
  @Input() selectedValues: RolesResult[];
  @Output() onSelectedValuesChange = new EventEmitter<RolesResult[]>();

  constructor() {}

  ngOnInit(): void {
    this.initializeSelectedValues();
  }

  ngOnChanges(changes: any) {
    if (changes.selectedValues && !changes.selectedValues.firstChange) {
      this.selectedValues = changes.selectedValues.currentValue;
    }

    if (changes.enableAllOptions && !changes.enableAllOptions.firstChange) {
      this.initializeSelectedValues();
    }
  }

  selectRoles() {
    this.onSelectedValuesChange.emit(this.selectedValues);
  }

  private initializeSelectedValues() {
    if (!this.enableAllOptions) {
      this.selectedValues = [this.parameterList[0]];
      this.onSelectedValuesChange.emit(this.selectedValues);
    } else {
      this.selectedValues = [];
    }

    if (this.selectedValues !== undefined && this.selectedValues !== null) {
      this.onSelectedValuesChange.emit(this.selectedValues);
    }
  }
}
