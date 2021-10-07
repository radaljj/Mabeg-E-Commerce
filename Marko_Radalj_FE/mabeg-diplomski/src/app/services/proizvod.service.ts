import { Proizvod } from 'src/app/common/proizvod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map}from 'rxjs/operators';
import { ProizvodKategorija } from '../common/proizvod-kategorija';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {






  private listaUrl='http://localhost:8080/api/proizvodi';
  private kategorijaUrl='http://localhost:8080/api/proizvod-kategorija';


  constructor(private httpClient: HttpClient) { }


  getProductListPaginate(thePage:number,
    thePageSize:number,
    theCategoryId:number):  Observable<GetResponseProizvod> {
      //url sa parametrima za vracanje proizvoda kao i za stranu i velicinu(pagable is rest API)

    const pretragaUrl = `${this.listaUrl}/search/findByKategorija_Id?id=${theCategoryId}`+`&page=${thePage}&size=${thePageSize}`;
  
    return this.httpClient.get<GetResponseProizvod>(pretragaUrl);
  
  }






getProductList(theCategoryId:number):  Observable<Proizvod[]> {

  const pretragaUrl = `${this.listaUrl}/search/findByKategorija_Id?id=${theCategoryId}`;

  return this.getProizvodi(pretragaUrl);

}


getCategories(): Observable<ProizvodKategorija[]> {
  return this.httpClient.get<KategorijaGet>(this.kategorijaUrl).pipe(
    map(response => response._embedded.proizvodKategorija)
  );
}



searchProducts(theKeyword: string): Observable<Proizvod[]> {
  const pretragaUrl = `${this.listaUrl}/search/findByImeProizvodaContaining?imeProizvoda=${theKeyword}`;

  return this.getProizvodi(pretragaUrl);
}




searchProductsPaginate(thePage:number,
                      thePageSize:number,
                       theKeyword:string):  Observable<GetResponseProizvod> {
    //url sa parametrima za vracanje proizvoda kao i za stranu i velicinu(pagable is rest API)

  const pretragaUrl = `${this.listaUrl}/search/findByImeProizvodaContaining?imeProizvoda=${theKeyword}`+`&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProizvod>(pretragaUrl);

}






  private getProizvodi(pretragaUrl: string): Observable<Proizvod[]> {
    return this.httpClient.get<GetResponseProizvod>(pretragaUrl).pipe(
      map(response => response._embedded.proizvodi)
    );
  }


  getProduct(proizvodId: number):Observable<Proizvod> {

    // mora da se uzme url na osnovu id proizvoda

    const proizvodUrl=`${this.listaUrl}/${proizvodId}`;

    return this.httpClient.get<Proizvod>(proizvodUrl);

  }


}

interface GetResponseProizvod {
  _embedded: {
  proizvodi: Proizvod[];
},
page:{
  size:number,
  totalElements:number,
  totalPages:number,
  number:number
}
}

interface KategorijaGet {
  _embedded: {
    proizvodKategorija: ProizvodKategorija[];
  }
}


