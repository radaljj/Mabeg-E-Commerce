import { CartItem } from './../../common/cart-item';
import { CartService } from './../../services/cart.service';
import { Proizvod } from 'src/app/common/proizvod';
import { Component, OnInit } from '@angular/core';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} 
      from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proizvod-detalj',
  templateUrl: './proizvod-detalj.component.html',
  styleUrls: ['./proizvod-detalj.component.css']
})
export class ProizvodDetaljComponent implements OnInit {
  closeResult = '';


  proizvod:Proizvod=new Proizvod();

  constructor(private servis:ProizvodService,private korpaServis:CartService,private route:ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
      // @ts-ignore: Object is possibly 'null'.
    const proizvodId: number=+this.route.snapshot.paramMap.get('id');
    this.servis.getProduct(proizvodId).subscribe(
      data=>{
        this.proizvod=data;
      }
    )
  }

  addToCart(){

    console.log(`Dodavanje u korpu:${this.proizvod.imeProizvoda},${this.proizvod.cenaProizvoda}`);
const korpaProizvod=new CartItem(this.proizvod);

this.korpaServis.addToCart(korpaProizvod);


  }

  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
