import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { DOWNLOAD_ICON, MENU_ICON, PROFILE_ICON, SEARCH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // drawerState:boolean=false
  // subscription!:Subscription
  // searchString:string=''


  constructor(
    private dataService:DataserviceService,
    private domSanitizer:DomSanitizer,
    private matIconRegistry:MatIconRegistry) 
    {
      matIconRegistry.addSvgIconLiteral("menu-icon", domSanitizer.bypassSecurityTrustHtml(MENU_ICON)),
      matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON))
      matIconRegistry.addSvgIconLiteral("download-icon", domSanitizer.bypassSecurityTrustHtml(DOWNLOAD_ICON))
      matIconRegistry.addSvgIconLiteral("profile-icon", domSanitizer.bypassSecurityTrustHtml(PROFILE_ICON))


     }

  ngOnInit(): void {
  }
  
  // handleDrawerClick(){
  //   this.dataService.changeDrawerState(!this.drawerState)
  // }

}
