import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proizvod } from 'src/app/common/proizvod';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-proizvod-lista',
  templateUrl: './proizvod-lista.component.html',
  styleUrls: ['./proizvod-lista.component.css']
})
export class ProizvodListaComponent implements OnInit {

  proizvodi: Proizvod[]=[];

  currentCategoryId:number=1;
  previousCategoryId: number=1;
  searchMode:boolean=false;

  //vrednosti za paginaciju

  thePageNumber:number=1;
  thePageSize:number=8;//koliko proizvoda moze biti na jednoj strani
  theTotalElements:number=0;

  previousKeyword :string=null as any;
  
  constructor(private servis: ProizvodService,private korpaServis:CartService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();

    });
  }

  listProducts() {
this.searchMode=this.route.snapshot.paramMap.has('keyword');

if(this.searchMode){
  this.handleSearchProducts();
}
else{
  this.handleListProducts();

}

  }




handleSearchProducts(){
  const theKeyword:string=this.route.snapshot.paramMap.get('keyword') || '';

//ako je keyword drugaciji od prethodnog onda pageNumber treba biti 1

if(this.previousKeyword!=theKeyword){
  this.thePageNumber=1;
}
this.previousKeyword=theKeyword;

console.log( `keyWord=${theKeyword}`,`pageNumber=${this.thePageNumber}`);



  // sada pretraga proizvoda pomocu promenljive keyword

  this.servis.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,theKeyword)
  .subscribe(this.processResult());
}
  handleListProducts(){


     //provera da li je id dobar parametar
const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');

if(hasCategoryId){
  //konverzija id iz stringa u broj
  // @ts-ignore: Object is possibly 'null'.
  this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
}
else{
  //ako nema dobrog id-a
  this.currentCategoryId=1;
}



//provera da li je razlicita kategorija od prethodne
//ako je kategorija drugacija u smislu da je id drugaciji onda se thePageNumber vraca da bude =1


if(this.previousCategoryId!=this.currentCategoryId){
  this.thePageNumber=1;
}

this.previousCategoryId=this.currentCategoryId;

console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`);




//uzimanje proizvoda za kategoriju

//pagenum-1 jer je u angularu paginacija od 1 a u springu krece od 0 
    this.servis.getProductListPaginate(this.thePageNumber-1,this.thePageSize, this.currentCategoryId)
    .subscribe(this.processResult());


}

processResult(){

  return data=>{
    this.proizvodi=data._embedded.proizvodi;
    this.thePageNumber=data.page.number+1;
    this.thePageSize=data.page.size;
    this.theTotalElements=data.page.totalElements;

  };

  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }


  addToCart(proizvod:Proizvod){
    console.log(`Dodavanje u korpu :${proizvod.imeProizvoda},${proizvod.cenaProizvoda}`);

const korpaItem =new CartItem(proizvod);
this.korpaServis.addToCart(korpaItem);

  }


}