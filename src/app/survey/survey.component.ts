import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SurveyService } from './survey.service';

// Handling all of the survey actions; Zipcode lookip, submit, retrieve and other api actions

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  title = 'Survey';
  surveyId?: number; // Optional ID for PUT requests
 
  firstName: string = '';
  lastName: string = '';
  telephone: string = '';
  email: string = '';
  surveyDate: string = '';
  street: string = '';
  zipcode: string = '';
  city: string = '';
  state: string = '';
  recommend: string = '';
  comments: string = '';
  zipError: string = '';
  likedMost: string = '';
  interestSource: string = '';


  constructor(private http: HttpClient,
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router) {}

  
  ngOnInit(): void {
    // Check for survey ID in the route
    this.surveyId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.surveyId) {
      this.getSurvey(this.surveyId);
    }
  }

   // Fetch survey by ID for editing
   getSurvey(id: number): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (data : any) => {
        console.log("Data", data)
        // this.surveyData = data;
        this.firstName= data?.firstName;
        this.lastName = data?.lastName;
        this.telephone = data?.telephone;
        this.email = data?.email;
        this.surveyDate = data?.surveyDate;
        this.street = data?.streetAddress;
        this.zipcode = data?.zip;
        this.city = data?.city;
        this.state = data?.state;
        this.recommend = data?.recommendation;
        this.comments = data?.comments;
        this.likedMost = data?.likedMost;
        this.interestSource =  data?.interestSource;
      },
      error: (err : any) => {
        console.error('Error fetching survey:', err);
        alert('Failed to fetch survey data.');
      }
    });
  }

  fetchLocationData(zipcode: string): void {
    this.zipError = '';  // Clear previous errors
    this.http.get<any>('assets/zipcodes.json').subscribe(
      (data) => {
        const zipcodeData = data.zipcodes.find((item: any) => item.zip_code == zipcode);
        if (zipcodeData) {
          this.city = zipcodeData.city;
          this.state = zipcodeData.state;
        } else {
          this.zipError = 'Invalid zip code.';
          this.city = '';
          this.state = '';
        }
      },
      (error) => {
        this.zipError = 'An error occurred while fetching data.';
      }
    );
  }

  validateForm(form: NgForm): void {
    if (form.invalid) {
      this.zipError = 'Please fill out all required fields correctly.';
      form.control.markAllAsTouched();
    }if(this.zipError != ''){
      form.control.markAllAsTouched();
    } 
    else {
      this.zipError = '';
      this.firstName = '';
      this.lastName = '';
      this.telephone = '';
      this.email = '';
      this.surveyDate = '';
      this.street = '';
      this.zipcode = '';
      this.city = '';
      this.state = '';
      this.recommend = '';
      this.comments = '';
      this.likedMost = '';
      this.interestSource =  '';
      form.reset();
      alert('Form submitted successfully!');
    }
  }

  onSubmit(form: NgForm): void {
    console.log('ziperror', this.zipError)
    if (form.invalid) {
      alert('Please fill out all required fields.');
      form.control.markAllAsTouched();
      return;
    }
    if(this.zipError != ''){
      form.control.markAllAsTouched();
      return
    }
  
    const surveyData = {  
      firstName: this.firstName,
      lastName: this.lastName,
      telephone: this.telephone,
      email: this.email,
      surveyDate: this.surveyDate,
      streetAddress: this.street,
      zip: this.zipcode,
      city: this.city,
      state: this.state,
      recommendation: this.recommend,
      comments: this.comments,
      likedMost: this.likedMost,
      interestSource: this.interestSource
    };
  
    if (this.surveyId) {
      // Update survey (PUT)
      this.surveyService.updateSurvey(this.surveyId, surveyData).subscribe({
        next: () => {
          alert('Survey updated successfully.');
          this.router.navigate(['/listall']);
        },
        error: (err: any) => {
          console.error('Error updating survey:', err);
          alert('Failed to update survey.');
        }
      });
    } else {
      
      // Create new survey (POST)
      this.surveyService.createSurvey(surveyData).subscribe({
        next: () => {
          alert('Survey created successfully.');
          form.reset(); // Reset the form after successful submission
          this.router.navigate(['/listall']);
        },
        error: (err: any) => {
          console.error('Error creating survey:', err);
          alert('Failed to create survey.');
        }
      });
    }
  }
  
}
