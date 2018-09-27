import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class Api{

  constructor(private http:Http){

  }

  getSubtitle(url){
    return this.http.get(url);
  }
}
