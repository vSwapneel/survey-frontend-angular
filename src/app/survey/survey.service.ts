import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SurveyData {
  id?: number;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  surveyDate: string;
  streetAddress: string;
  zip: string;
  city: string;
  state: string;
  recommendation: string;
  comments: string;
  likedMost: string;
  interestSource: string;
}

// Define all the services associated with survey

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  private baseUrl = 'http://localhost:8081/api/surveys';

  constructor(private http: HttpClient) { }

  // GET request to fetch survey by ID
  getSurveyById(id: number): Observable<SurveyData> {
    return this.http.get<SurveyData>(`${this.baseUrl}/${id}`);
  }

  // POST request to create a new survey
  createSurvey(surveyData: SurveyData): Observable<SurveyData> {
    return this.http.post<SurveyData>(this.baseUrl, surveyData);
  }

  // PUT request to update an existing survey
  updateSurvey(id: number, surveyData: SurveyData): Observable<SurveyData> {
    return this.http.put<SurveyData>(`${this.baseUrl}/${id}`, surveyData);
  }

  getAllSurveys(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  deleteSurvey(surveyId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/surveys/${surveyId}`);
  }
    
}
