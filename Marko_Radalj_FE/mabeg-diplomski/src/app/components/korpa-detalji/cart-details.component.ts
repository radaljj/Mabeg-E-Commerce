import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;


  constructor(private korpaServis:CartService) { }

  ngOnInit(): void {

    this.listCartDetails();
  }
  listCartDetails() {

    // dodeli niz da bude jednak nizu iz servisa
    this.cartItems = this.korpaServis.cartItems;

    // subscribe za cenu
    this.korpaServis.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe za kolicinu
    this.korpaServis.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // saberi sve pomocu metode iz servisa
    this.korpaServis.computeCartTotals();
  }


  incrementKolicina(korpaProizvod:CartItem){
    this.korpaServis.addToCart(korpaProizvod);

  }

  decrementKolicina(korpaProizvod:CartItem){

this.korpaServis.decrementKolicina(korpaProizvod);
  }

  ukloniSve(korpaProizvod){
    this.korpaServis.removeFromCart(korpaProizvod);

  }

}
