import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host:{
    class:"app-sidenav-cnt"
  }
})
export class SideNavComponent implements OnInit {

  // isDrawerOpen : boolean=false;
  // Subscription!:Subscription;
  // display:string="flex";
  constructor(private DataService:DataserviceService) { }

  ngOnInit(): void {
    // this.Subscription=this.DataService.currDrawerState.subscribe(res => {
    //   this.isDrawerOpen=res
    //   this. isDrawerOpen ? this.display="none" : this.display="flex" 

    // })
  }

}
