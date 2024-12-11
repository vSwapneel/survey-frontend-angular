import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../survey/survey.service';

// Handling different API calls and data persistence

@Component({
  selector: 'app-list-all',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-all.component.html',
  styleUrl: './list-all.component.css'
})
export class ListAllComponent  implements OnInit {
  surveys: any[] = []; // To store the fetched survey data

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.getAllSurveys();
  }

  getAllSurveys(): void {
    this.surveyService.getAllSurveys().subscribe({
      next: (data : any) => {
        this.surveys = data;
      },
      error: (err : any) => {
        console.error('Error fetching surveys:', err);
        alert('Failed to fetch surveys.');
      }
    });
  }

  onDelete(surveyId: number): void {
    if (confirm('Are you sure you want to delete this survey?')) {
      this.surveyService.deleteSurvey(surveyId).subscribe({
        next: () => {
          alert('Survey deleted successfully.');
          this.getAllSurveys();
        },
        error: (err: any) => {
          console.error('Error deleting survey:', err);
          alert('Failed to delete survey.');
        }
      });
    }
  }
}
