import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetTypeResult } from 'src/app/services/type-business/models/get-type-result';

@Component({
  selector: 'app-select-parameters',
  templateUrl: './select-parameters.component.html',
  styleUrls: ['./select-parameters.component.scss']
})
export class SelectParametersComponent implements OnInit {

  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() parameterList: GetTypeResult[];
  row: any;
  parameter: GetTypeResult;
  @Output() onRowChange = new EventEmitter<GetTypeResult>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.disabled) {
      this.row = this.parameterList[0];
      this.onRowChange.emit(this.row);
    } else {
      this.row = 0;
    }
  }

  selectParameter() {
    this.parameter = this.row === "0" ? new GetTypeResult({ code: 0, name: "All" }) : this.row;
    this.onRowChange.emit(this.parameter);
  }
}
