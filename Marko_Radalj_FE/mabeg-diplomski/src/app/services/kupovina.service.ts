import { Purchase } from './../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KupovinaService {

  private kupovinaUrl='http://localhost:8080/api/kupovina';


  constructor(private httpClient:HttpClient) { }

  placeOrder(kupovina:Purchase):Observable<any>{

return this.httpClient.post<Purchase>(this.kupovinaUrl,kupovina);
  }
}
