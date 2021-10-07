import { Purchase } from './../../common/purchase';
import { OrderItem } from './../../common/order-item';
import { Router } from '@angular/router';
import { KupovinaService } from './../../services/kupovina.service';
import { CartService } from './../../services/cart.service';
import { Regija } from './../../common/regija';
import { FormServiceService } from './../../services/form-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Validator } from 'src/app/validators/validator';
import { Drzava } from 'src/app/common/drzava';
import { Order } from 'src/app/common/order';
import swal from 'sweetalert2'; 


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number=0;
  totalQuantity: number=0;

  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  drzave:Drzava[]=[];
  shippingAddressStates:Regija[]=[];
  billingAddressStates:Regija[]=[];





  

  constructor(private formBuilder: FormBuilder,
    private formaServis:FormServiceService,
    private korpaServis:CartService,
    private kupovinaServis:KupovinaService,
    private router:Router) {}

  ngOnInit(): void {

    


this.reviewCardDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      kupac: this.formBuilder.group({
        ime: new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        prezime: new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        imeFirme:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      adresaZaSlanje: this.formBuilder.group({
        ulica:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        grad:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        imeRegije:  new FormControl('',[Validators.required]),
        imeDrzave: new FormControl('',[Validators.required]),
        postanskiBroj:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
      }),
      placanjePodaci: this.formBuilder.group({
        ulica:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        grad:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
        imeRegije:  new FormControl('',[Validators.required]),
        imeDrzave: new FormControl('',[Validators.required]),
        postanskiBroj:  new FormControl('',[Validators.required,Validators.minLength(2),Validator.notOnlyWhitespace]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), 
                                          Validator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });


//popuni dropdown listu sa mesecima i godinama

const startMonth:number=new Date().getMonth()+1;
console.log("StartMonth"+ startMonth);

this.formaServis.getCreditCardMonths(startMonth).subscribe(data=>{
console.log("Uspesno preuzeti meseci "+JSON.stringify(data));
this.creditCardMonths=data;
}
);

this.formaServis.getCreditCardYears().subscribe(data=>{
  console.log("Uspesno preuzete godine "+JSON.stringify(data));
  this.creditCardYears=data;

}
);

this.formaServis.getCountries().subscribe(
  data=>{
    console.log("Drzave "+JSON.stringify(data));
    this.drzave=data;
  }
);


  }

  onSubmit() {





    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }


    console.log(this.checkoutFormGroup.get('kupac')?.value);

// napravi porudzbinu

let porudzbina=new Order();
porudzbina.ukupnaCena=this.totalPrice;
porudzbina.ukupnoKomada=this.totalQuantity;

//uzmi proizvode iz korpe

const cartItems=this.korpaServis.cartItems;

let porudzbinaProizvodi:OrderItem[]=[];
for(let i=0;i<cartItems.length;i++){
  porudzbinaProizvodi[i]=new OrderItem(cartItems[i]);
}

//napravi proizvde

let kupovina= new Purchase();

 // popunjavanje shipping adrese za slanje
 kupovina.shippingAdresa = this.checkoutFormGroup.controls['adresaZaSlanje'].value;
 const shippingCountry: Drzava = JSON.parse(JSON.stringify(kupovina?.shippingAdresa?.imeDrzave  || null ));


 const shippingState: Regija = JSON.parse(JSON.stringify(kupovina.shippingAdresa.imeRegije || null));
 kupovina.shippingAdresa.imeRegije = shippingState.imeRegije;
 kupovina.shippingAdresa.imeDrzave = shippingCountry.imeDrzave;

 // popunjavanje adrese za placanje
 kupovina.billingAdresa = this.checkoutFormGroup.controls['placanjePodaci'].value;
 const billingState: Regija = JSON.parse(JSON.stringify(kupovina.billingAdresa.imeRegije || null));
 const billingCountry: Drzava = JSON.parse(JSON.stringify(kupovina?.billingAdresa?.imeDrzave || null ));
 kupovina.billingAdresa.imeRegije = billingState.imeRegije;
 kupovina.billingAdresa.imeDrzave = billingCountry.imeDrzave;



//

kupovina.customer=this.checkoutFormGroup.controls['kupac'].value;


//napravi kupovinu

kupovina.order=porudzbina;
kupovina.orderItems=porudzbinaProizvodi;


//rest poziv

this.kupovinaServis.placeOrder(kupovina).subscribe(
  {
    next:response=>{
//alert(`Vaša porudžbina je uspešno primljena.\nVaš broj za praćenje porudžbine je:${response.orderTrackingNumber} `);
swal.fire('Uspešno!', `Vaša porudžbina je uspešno primljena.\nVaš broj za praćenje porudžbine je:${response.orderTrackingNumber} `, 'success')
 

this.resetCart();

    },
    error:err=>{
      alert(`Došlo je do greške : ${err.message}`);
      swal.fire('Greška', `Došlo je do greške : ${err.message} `, 'error')


    }
  }
);

//poruci 




  }


  copyShippingAddressToBillingAddress($event){
    // @ts-ignore
    if(event.target.checked){
      this.checkoutFormGroup.controls.placanjePodaci.setValue(this.checkoutFormGroup.controls.adresaZaSlanje.value);
this.billingAddressStates=this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls.placanjePodaci.reset();
      this.billingAddressStates=[];
    }

  }


get ime(){
  return this.checkoutFormGroup.get('kupac.ime');
}

get prezime(){
  return this.checkoutFormGroup.get('kupac.prezime');
}

get imeFirme(){
  return this.checkoutFormGroup.get('kupac.imeFirme');
}

get email(){
  return this.checkoutFormGroup.get('kupac.email');
}

get shippingUlica(){
  return this.checkoutFormGroup.get('adresaZaSlanje.ulica');
}
get shippingGrad(){
  return this.checkoutFormGroup.get('adresaZaSlanje.grad');
}

get shippingDrzava(){
  return this.checkoutFormGroup.get('adresaZaSlanje.imeDrzave');
}

get shippingRegija(){
  return this.checkoutFormGroup.get('adresaZaSlanje.imeRegije');
}

get shippingKod(){
  return this.checkoutFormGroup.get('adresaZaSlanje.postanskiBroj');
}



get placanjePodaciUlica(){
  return this.checkoutFormGroup.get('placanjePodaci.ulica');
}
get placanjePodaciGrad(){
  return this.checkoutFormGroup.get('placanjePodaci.grad');
}

get placanjePodaciDrzava(){
  return this.checkoutFormGroup.get('placanjePodaci.imeDrzave');
}

get placanjePodaciRegija(){
  return this.checkoutFormGroup.get('placanjePodaci.imeRegije');
}

get placanjePodaciKod(){
  return this.checkoutFormGroup.get('placanjePodaci.postanskiBroj');
}



get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }






  handleMonthsAndYears(){
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
    const currentYear:number=new Date().getFullYear();
    const selectedYear:number=Number(creditCardFormGroup?.value.expirationYear);

    let startMonth:number;
    if(currentYear===selectedYear){
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1;
    }

    this.formaServis.getCreditCardMonths(startMonth).subscribe(
data=>{
  console.log("Dobijeni meseci"+JSON.stringify(data));
  this.creditCardMonths=data;
}
    );
  }

  resetCart() {
    //izbrisi sve iz korope
this.korpaServis.cartItems=[];
this.korpaServis.totalPrice.next(0);
this.korpaServis.totalQuantity.next(0);

//resetuj formu
this.checkoutFormGroup.reset();

//vrati na proizvode

this.router.navigateByUrl("/proizvodi");



  }

  reviewCardDetails() {
this.korpaServis.totalQuantity.subscribe(
  totalQuantity=>this.totalQuantity=totalQuantity
);


this.korpaServis.totalPrice.subscribe(
  totalPrice=>this.totalPrice=totalPrice
);

  }
  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    // @ts-ignore
    const countryCode = formGroup.value.imeDrzave.kod;
    // @ts-ignore
    const countryName = formGroup.value.imeDrzave.imeDrzave;

    console.log(`${formGroupName} Kod drzave: ${countryCode}`);
    console.log(`${formGroupName} Ime drzave: ${countryName}`);

    this.formaServis.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'adresaZaSlanje') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }
    // @ts-ignore
        formGroup.get('imeRegije').setValue(data[0]);
      }
    );
  }


}
