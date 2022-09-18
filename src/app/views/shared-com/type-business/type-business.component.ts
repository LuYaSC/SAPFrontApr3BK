import { Component, Input, OnInit } from '@angular/core';
import {CityService} from '../../../services/type-business/city.service';
import {GetTypeResult} from '../../../services/type-business/models/get-type-result';

@Component({
  selector: 'app-type-business',
  templateUrl: './type-business.component.html',
  styleUrls: ['./type-business.component.scss']
})
export class TypeBusinessComponent implements OnInit {

  @Input() listTypes :  GetTypeResult[] = [];
  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    debugger
    this.cityService.getAll().subscribe({
      next: (resp: GetTypeResult[]) => {
        debugger;

      },
      error: (error: any) => {
        debugger
        //this.message = 'Not Available Service: ' + error.message;
        //this.visible = true;
      }
    });
  }



}
