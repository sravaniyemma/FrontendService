import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RESTAPIService } from '../Services/rest-api.service';
import { SharedService } from '../Services/shared.service';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name!: String;
  password!: String;

  constructor(private elementRef: ElementRef, private _sharedService: SharedService, private _restApiService: RESTAPIService, private router: Router) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#A9A9A9';
  }

  onSubmit(value: any) {
    this.name = value.name;
    this.password = this._sharedService.doMd5Hash(value.password);
    this.authenticateUser();
  }

  authenticateUser() {
    let userInfo: LooseObject;
    this._restApiService.getUser(this.name).subscribe(data => {
      userInfo = data;
      if (userInfo.hasOwnProperty("Id") && userInfo.Id == 0) {
        alert("Unauthenticated User! please register.");
      } else {
        if (userInfo.name == this.name && userInfo.password == this.password) {
          alert("Login success!");
          this.router.navigate(['userList']);
        } else
          alert("Invalid name/password");
      }
    })
  }
}
