import { Component, Input, OnInit } from '@angular/core';
import { CityService } from '../../../services/type-business/city.service';
import { GetTypeResult } from '../../../services/type-business/models/get-type-result';

@Component({
  selector: 'app-type-business',
  templateUrl: './type-business.component.html',
  styleUrls: ['./type-business.component.scss']
})
export class TypeBusinessComponent implements OnInit {

  @Input() listTypes: GetTypeResult[] = [];
  @Input() typeName: string = '';
  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        debugger;
        this.listTypes = resp;
      },
      error: (error: any) => {
        debugger
        //this.message = 'Not Available Service: ' + error.message;
        //this.visible = true;
      }
    });
  }

  selectUser($event: GetTypeResult) {

  }
}
