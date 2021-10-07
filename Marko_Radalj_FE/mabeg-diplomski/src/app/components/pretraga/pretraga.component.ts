import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(){
  }

  doSearch(vrednostUnosa:string){
    console.log(`value=${vrednostUnosa}`);
    this.router.navigateByUrl(`/search/${vrednostUnosa}`);
  }

}
