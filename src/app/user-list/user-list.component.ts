import { Component, OnInit } from '@angular/core';
import { RESTAPIService } from '../Services/rest-api.service';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table'


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsersData: any;
  columnsToDisplay: any;

  constructor(private _restApiService: RESTAPIService, private router: Router) { }

  ngOnInit(): void {
    this._restApiService.getAllUsers().subscribe((data: any) => {
      this.columnsToDisplay = Object.keys(data[0]);
      this.columnsToDisplay.push('Action');
      this.allUsersData = data;
    });
  }

  deleteRecord(element: any) {
    this._restApiService.deleteUser(element).subscribe(data => {
      alert("Record Deleted");
      location.reload();
    });

  }

}
