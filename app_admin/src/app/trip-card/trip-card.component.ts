import { Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router";

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

/* 
  This component holds the view for an individual trip and allows 
  the user to navigate to the edit-trip and delete-trip components.
*/

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  
  @Input('trip') trip: Trip;
  constructor(
    private router: Router, 
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private editTrip(trip: Trip): void {
    console.log('Inside TripListingComponent#editTrip');
    // Stash the trip code in browser's local storage to retreive later
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  private deleteTrip(trip: Trip): void {
    console.log('Inside TripListingComponent#deleteTrip');
    // Confirm the delete of trip
    const confirmDelete = confirm("Are you sure you want to delete this trip?");
    const isLoggedIn = this.isLoggedIn();

    if (confirmDelete) {
      if (isLoggedIn) {
        // Call deleteTrip method from the service
        this.tripDataService.deleteTrip(this.trip.code)
          .then(() => {
            console.log("Trip successfully deleted");
          })
          .catch(err => {
            console.log("Error deleting trip: " + err);
          });
      } 
    }
  }

}
