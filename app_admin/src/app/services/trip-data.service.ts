import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';
import { User } from '../models/user';

/* 
  This service interacts with the API to perform CRUD operations 
  based on the form data retreived from the components. This service
  also communicates with the AuthService to check authentication and
  authorization in the browser of the SPA.
*/

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Receive HTTP module
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage, // inject browser storage to service class
    ) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  // POST a new trip to DB from API endpoint
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');

    const httpOptions = {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };

    return this.http
      // Add this tri
      .post(this.tripUrl, formData, httpOptions) // pass form data in request body
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  // GET a single trip from API endpoint
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    
    return this.http
      // Get specific trip from API
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response as Trip) 
      .catch(this.handleError);
  }

  // GET all trips from API endpoint
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');

    return this.http
      // Get array of trips from API  
      .get(this.tripUrl)   // Get trips
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }

  // PUT: update a trip
  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);

    const httpOptions = {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };

    return this.http
      // At the specified tripCode, update formData
      .put(this.tripUrl + formData.code, formData, httpOptions)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
  }


  // DELETE: delete a trip
  public deleteTrip(tripCode: string): Promise<void> {
    console.log('Inside TripDataService#deleteTrip');

    const httpOptions = {
      headers: new HttpHeaders ({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };

    return this.http
      .delete(this.tripUrl + tripCode, httpOptions)
      .toPromise()
      // Successful delete doesn't return data. Fufills promise with null
      .then(() => null)
      .catch(this.handleError);
  }

  // Handle errors regarding promise rejection
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  // Login
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  // Register
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  // Make API call based on method and return as an AuthResponse of authorized or not
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }
}