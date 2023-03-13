import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RolesResult } from 'src/app/services/roles/models/roles-result';

@Component({
  selector: 'app-select-roles',
  templateUrl: './select-roles.component.html',
  styleUrls: ['./select-roles.component.scss']
})
export class SelectRolesComponent implements OnInit {

  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() enableAllOptions: boolean = false;
  @Input() parameterList: RolesResult[];
  @Input() selectedValue: RolesResult;
  row: any;
  parameter: RolesResult;
  @Output() onRowChange = new EventEmitter<RolesResult>();

  constructor() { }

  ngOnInit(): void {
    this.initializeRow();
  }

  ngOnChanges(changes: any) {
    if (changes.selectedValue && !changes.selectedValue.firstChange) {
      this.row = this.selectedValue;
      this.onRowChange.emit(this.row);
    }

    if (changes.enableAllOptions && !changes.enableAllOptions.firstChange) {
      this.initializeRow();
    }
  }

  selectRol() {
    this.parameter = this.row === "0" ? new RolesResult({ id: 0, name: "All" }) : this.row;
    this.onRowChange.emit(this.parameter);
  }

  private initializeRow() {
    if (!this.enableAllOptions) {
      this.row = this.parameterList[0];
      this.onRowChange.emit(this.row);
    } else {
      this.row = 0;
    }

    if (this.selectedValue !== undefined && this.selectedValue !== null) {
      this.row = this.selectedValue;
      this.onRowChange.emit(this.row);
    }
  }
}
