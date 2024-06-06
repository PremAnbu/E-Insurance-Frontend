import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  items = Array(5);

  cartDetails:boolean=false
  constructor() { }

  ngOnInit(): void {
  }
  learnMore(){
    this.cartDetails=true
  }

}
