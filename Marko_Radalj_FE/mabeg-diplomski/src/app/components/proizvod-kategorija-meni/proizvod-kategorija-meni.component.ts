import { ProizvodKategorija } from './../../common/proizvod-kategorija';
import { Component, OnInit } from '@angular/core';
import { ProizvodService } from 'src/app/services/proizvod.service';

@Component({
  selector: 'app-proizvod-kategorija-meni',
  templateUrl: './proizvod-kategorija-meni.component.html',
  styleUrls: ['./proizvod-kategorija-meni.component.css']
})
export class ProizvodKategorijaMeniComponent implements OnInit {

  proizvodKategorija:ProizvodKategorija[];

  constructor(private servis: ProizvodService) { }

  ngOnInit() {

    this.listProductCategories();
  }
  listProductCategories() {
this.servis.getCategories().subscribe(
data=>{
  console.log('Kategorije proizvoda='+JSON.stringify(data));
  this.proizvodKategorija=data;
}
);
  }

}
