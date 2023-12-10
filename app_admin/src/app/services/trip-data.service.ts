import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../models/trip';

@Injectable()
export class TripDataService {

  // Receive HTTP module
  constructor(private http: Http) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  // POST a new trip to DB from API endpoint
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      // Add this tri
      .post(this.tripUrl, formData) // pass form data in request body
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // GET a single trip from API endpoint
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      // Get specific trip from API
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip) 
      .catch(this.handleError);
  }

  // GET all trips from API endpoint
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      // Get array of trips from API  
      .get(this.tripUrl)   // Get trips
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // PUT: update a trip
  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      // At the specified tripCode, update formData
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // DELETE: delete a trip
  public deleteTrip(tripCode: string): Promise<void> {
    console.log('Inside TripDataService#deleteTrip');
    return this.http
      .delete(this.tripUrl + tripCode)
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

}