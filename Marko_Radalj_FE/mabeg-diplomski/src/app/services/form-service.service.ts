import { Regija } from './../common/regija';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Drzava } from '../common/drzava';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private drzavaUrl="http://localhost:8080/api/drzave";
  private regijeUrl="http://localhost:8080/api/regije";


  constructor(private httpsClient:HttpClient) { }

  getCountries():Observable<Drzava[]>{
    return this.httpsClient.get<GetResponseCountries>(this.drzavaUrl).pipe(
map(response =>response._embedded.drzave)
    );
  }


  getStates(drzavaKod:string):Observable<Regija[]>{
    const searchRegijaUrl=`${this.regijeUrl}/search/findByDrzavaKod?kod=${drzavaKod}`;
    return this.httpsClient.get<GetResponseRegions>(searchRegijaUrl).pipe(
map(response =>response._embedded.regije)
    );
  }



  getCreditCardMonths(startMonth:number):Observable<number[]>{

    let data:number[]=[];

    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);

  }

  getCreditCardYears():Observable<number[]>{

    let data:number[]=[];

    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;

    for(let theYear=startYear;theYear<=endYear;theYear++){
      data.push(theYear);
    }
    return of(data);

  }


}

interface GetResponseCountries{
  _embedded:{
    drzave:Drzava[];
  }
}

interface GetResponseRegions{
  _embedded:{
    regije:Regija[];
  }
}

