import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice : number=0.00;
  totalQuantity:number=0;


  constructor(private korpaServis:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {

          //prosledjivanje ukupne cene u korpi
    this.korpaServis.totalPrice.subscribe(
      data=>this.totalPrice=data
      );


      //prosledjivanje ukupno stvari u korpi
      this.korpaServis.totalQuantity.subscribe(
        data=>this.totalQuantity=data
        );
    


  }

}
