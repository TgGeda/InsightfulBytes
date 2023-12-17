import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentDate = new Date();
  showDescription = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }
}
 
