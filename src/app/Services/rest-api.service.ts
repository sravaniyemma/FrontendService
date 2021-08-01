import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {

  addUpdateUserApi = "https://peter-htet.outsystemscloud.com/ITDInterviews/rest/Users/AddUpdateUser";
  deleteUserApi = "https://peter-htet.outsystemscloud.com/ITDInterviews/rest/Users/DeleteUser?id=";
  getAllUsersApi = "http://localhost:5000/GetAllUsers";
  getUserApi = "https://peter-htet.outsystemscloud.com/ITDInterviews/rest/Users/GetUser?name=";

  constructor(private _httpClientService: HttpClient) { }

  public getAllUsers() {
    return this._httpClientService.get(this.getAllUsersApi);
  }
  public getUser(name: String) {
    return this._httpClientService.get(this.getUserApi + name);
  }
  public addUpdateUser(userObj: any) {
    return this._httpClientService.post(this.addUpdateUserApi, userObj);
  }
  public deleteUser(id: any) {
    return this._httpClientService.get(this.deleteUserApi + id);
  }
}
