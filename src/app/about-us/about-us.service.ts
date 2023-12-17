import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor() { }

  getAboutUsInfo() {
    // You can fetch the information from an API or a database, but for this example, we'll return static information.
    return {
      title: 'About Us',
      content: 'Welcome to our blog! We are passionate about sharing valuable information and insights in our industry. Our mission is to provide high-quality content to our readers and build a community of knowledge sharing.'
    };
  }
}
