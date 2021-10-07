import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // provera da li je proizvod vec u korpi
    let alreadyExistsInCart: boolean = false;
    // @ts-ignore
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //nadji na osnovu ida proizvod

 // @ts-ignore
      existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);








     /*  for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      } */

      // provera jel pronadjen
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // ako jeste onda samo povecaj 
      existingCartItem.brojUKorpi++;
    }
    else {
      // ako nije dodaj u niz
      this.cartItems.push(theCartItem);
    }

    // saberi vrednost korpe
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.brojUKorpi * currentCartItem.cenaProizvoda;
      totalQuantityValue += currentCartItem.brojUKorpi;
    }

    // sa next funkcijom prosledjuju se podavi svima komponentama da ih vide
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Proizvodi u korpi:');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.brojUKorpi * tempCartItem.cenaProizvoda;
      console.log(`Ime proizvoda: ${tempCartItem.imeProizvoda}, Kolicina u korpi=${tempCartItem.brojUKorpi}, Cena po komadu=${tempCartItem.cenaProizvoda}, Ukupna cena proizvoda=${subTotalPrice}`);
    }

    console.log(`Ukupna cena: ${totalPriceValue.toFixed(2)}, Ukupna kolicina: ${totalQuantityValue}`);
    console.log('----');
  }

  decrementKolicina(korpaProizvod: CartItem) {
korpaProizvod.brojUKorpi--;
if(korpaProizvod.brojUKorpi==0){
  this.removeFromCart(korpaProizvod);
}else{
  this.computeCartTotals();
}

  }
  removeFromCart(korpaProizvod: CartItem) {

    //nadji index u nizu

    const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id===korpaProizvod.id);

    //ako je pronadjen izbrisi ga iz niza za odredjen id

    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }

  }
}