import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RESTAPIService } from '../Services/rest-api.service';
import { SharedService } from '../Services/shared.service';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRegistrationDetails: LooseObject = {};
  userId: any = 0;

  constructor(private elementRef: ElementRef, private _sharedService: SharedService, private _restApiService: RESTAPIService, private router: Router) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#8B0000';
  }

  onSubmit(registrationFormValue: any) {
    let status: LooseObject;
    let id: any;
    for (const property in registrationFormValue) {
      if (property === 'password')
        this.userRegistrationDetails[property] = this._sharedService.doMd5Hash(registrationFormValue['password']);
      else
        this.userRegistrationDetails[property] = registrationFormValue[property];
    }
    this.userAlreadyExists();
    setTimeout(() => {
      this._restApiService.addUpdateUser(this.userRegistrationDetails).subscribe(data => {
        status = data;
        if (status["IsSuccess"])
          this.router.navigate(['login']);
        else {
          alert("Registration Failed");
        }
      });
    }, 2000);
  }

  userAlreadyExists() {
    let userDetails: any = 0;
    if (this.userRegistrationDetails.hasOwnProperty("name")) {
      this._restApiService.getUser(this.userRegistrationDetails.name).subscribe(data => {
        userDetails = data;
        if (userDetails.Id) {
          this.userId = userDetails.Id;
          this.userRegistrationDetails["Id"] = userDetails.Id;
        }
      });
    }
  }

}