import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-mypolicy',
  templateUrl: './mypolicy.component.html',
  styleUrls: ['./mypolicy.component.scss']
})
export class MypolicyComponent implements OnInit {

  purchaseList: any[] = []; // Ensure this is an array

  constructor(private httpService: HttpserviceService) { }

  ngOnInit(): void {
    this.httpService.getAllPurchaseApi().subscribe(res => {
      this.purchaseList = res.data;
    });
  }

  cancelPolicy(policy: any): void {
    // Implement cancel policy functionality
    console.log('Cancel policy:', policy);
  }

  makePayment(policy: any): void {
    // Implement make payment functionality
    console.log('Make payment for policy:', policy);
  }
}
