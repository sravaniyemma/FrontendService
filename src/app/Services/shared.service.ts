import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  doMd5Hash(value: string): string {
    return Md5.hashStr(value).toString();
  }


}
