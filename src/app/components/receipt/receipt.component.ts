import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { PolicyserviceService } from 'src/app/services/policyservice.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  receipt: any;
  paymentId!: number;
  policyList: any;
  @ViewChild('template', { static: true }) template!: ElementRef;
  downloadBtn: boolean = false;
  paymentDate!:string;
  dob!:string

  constructor(private http: HttpClient,
              private httpService: HttpserviceService,
              private route: ActivatedRoute,
              private policyService: PolicyserviceService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentId = +params['paymentId'];
    });
    this.fetchInsuranceData();
  }

  fetchInsuranceData() {
    this.httpService.getReceipt(this.paymentId).subscribe(data => {
      this.receipt = data.data;
      if (this.receipt.paymentDate) {
        this.paymentDate = new Date(this.receipt.paymentDate).toISOString().split('T')[0];
      }
      if (this.receipt.dateOfBirth) {
        this.dob = new Date(this.receipt.dateOfBirth).toISOString().split('T')[0];
      }
      console.log("Fetched Receipt Data:", this.receipt);
      
      // Fetch policies only after receipt is available
      this.policyService.getAllPoliciesCall().subscribe(res => {
        this.policyList = res.data.filter((val: any) => val.policyId == this.receipt.policyId);
        console.log("Filtered Policies:", this.policyList);
      });
    },
    error => {
      console.error('Error fetching receipt:', error);
    });
  }

  download() {
    this.downloadBtn = true; 
    setTimeout(() => {  
      const pdf = new jsPDF();
      const content: HTMLElement = this.template.nativeElement;

      html2canvas(content).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        pdf.addImage(imageData, 'PNG', 0, 0, 211, 298);
        pdf.save(`Insurance_Receipt_${new Date().toISOString().split('T')[0]}.pdf`);
        this.downloadBtn = false;  // Show the download button again
      }).catch((error) => {
        console.error('Error generating PDF', error);
        this.downloadBtn = false; 
      });
    });
  }
}
