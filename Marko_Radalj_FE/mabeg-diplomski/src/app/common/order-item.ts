import { CartItem } from './cart-item';
export class OrderItem {
    imageUrl:string;
    kolicina:number;
    cenaKomad:number;;
    proizvodId:number;

    constructor(cartItem:CartItem){
        this.imageUrl=cartItem.slikaUrl;
        this.kolicina=cartItem.brojUKorpi;
        this.cenaKomad=cartItem.cenaProizvoda;
        this.proizvodId=cartItem.id;
    }
}
