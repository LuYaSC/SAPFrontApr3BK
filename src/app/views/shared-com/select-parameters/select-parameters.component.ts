import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';

@Component({
  selector: 'app-select-parameters',
  templateUrl: './select-parameters.component.html',
  styleUrls: ['./select-parameters.component.scss']
})
export class SelectParametersComponent implements OnInit {

  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() enableAllOptions: boolean = false;
  @Input() parameterList: GetTypeResult[];
  @Input() selectedValue: GetTypeResult;
  row: any;
  parameter: GetTypeResult;
  @Output() onRowChange = new EventEmitter<GetTypeResult>();

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

  selectParameter() {
    this.parameter = this.row === "0" ? new GetTypeResult({ code: 0, name: "All" }) : this.row;
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
