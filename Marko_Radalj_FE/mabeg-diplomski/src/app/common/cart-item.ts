import { Proizvod } from "./proizvod";

export class CartItem {


id:number;
imeProizvoda:string;
slikaUrl:string;
cenaProizvoda:number;
brojUKorpi:number;

constructor(proizvod:Proizvod){
    this.id=proizvod.id;
    this.imeProizvoda=proizvod.imeProizvoda;
    this.slikaUrl=proizvod.slikaUrl;
this.cenaProizvoda=proizvod.cenaProizvoda;

this.brojUKorpi=1;
    
}



}
