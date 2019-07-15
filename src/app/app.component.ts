import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import InformationList from './model/InformationList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  apiURL = 'http://localhost:50366/api/InformationModel';
  title = 'JuniorDevAssesmmentClient';
  InformationList: any = [];

  invocation = new XMLHttpRequest();

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/xml'
    })
  };

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    return this.getInformation().subscribe((data: {}) => {
      this.InformationList = data;
    });
  }
  getInformation(): Observable<InformationList> {
    return this.http.get<InformationList>(this.apiURL)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}

