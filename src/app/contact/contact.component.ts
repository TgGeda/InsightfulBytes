import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) { }

  submitForm() {
    const url = 'your-server-url'; // Replace with the actual server URL
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Assuming you have a formData object with properties like name, email, and message
    const formData = {
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message
    };

    this.http.post(url, formData, { headers }).subscribe(
      response => {
        // Handle successful response
        console.log('Form submitted successfully:', response);
        // Reset the form
        this.resetForm();
      },
      error => {
        // Handle error, e.g., show an error message
        console.error('An error occurred:', error);
      }
    );
  }

  resetForm() {
    // Reset the form fields and form data
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
  }
}
