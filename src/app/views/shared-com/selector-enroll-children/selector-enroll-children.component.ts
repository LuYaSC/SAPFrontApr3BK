import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector-enroll-children',
  templateUrl: './selector-enroll-children.component.html',
  styleUrls: ['./selector-enroll-children.component.scss']
})
export class SelectorEnrollChildrenComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() enableAllOptions: boolean = false;
  @Input() parameterList: any[];
  @Input() selectedValue: any;
  row: any;
  parameter: any;
  @Output() onRowChange = new EventEmitter<any>();

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
    this.parameter = this.row;
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