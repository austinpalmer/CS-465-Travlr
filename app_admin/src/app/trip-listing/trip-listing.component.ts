import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { trips } from './data/trips';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {

  trips: Trip[];
  message: string;

  // Import API service to retrieve array of trips
  constructor(private tripDataService: TripDataService, private router: Router) { }

  // POST trip from tripDataService, button click callback
  private addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
  }

  // GET trips from tripDataService
  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()   // retrieve trips from service
        .then(foundTrips => {
          // Output message and assign trips
          this.message = foundTrips.length > 0 ? '' : 'No Trips Found';
          this.trips = foundTrips;
        });
  }

  ngOnInit() {
    this.getTrips();
  }
}
