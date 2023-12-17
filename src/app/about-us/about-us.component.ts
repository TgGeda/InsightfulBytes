
import { Component, OnInit } from '@angular/core';
import { AboutUsService } from './about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  showDescription = false;
  aboutUsInfo: any;
  constructor(private aboutUsService: AboutUsService) { }

  ngOnInit(): void {
    this.aboutUsInfo = this.aboutUsService.getAboutUsInfo();
  }
  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

}

