import { Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router";

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  
  @Input('trip') trip: Trip;
  constructor(private router: Router, private tripDataService: TripDataService) { }

  ngOnInit(): void {
  }

  private editTrip(trip: Trip): void {
    console.log('Inside TripListingComponent#editTrip');
    // Stash the trip code in browser's local storage to retreive later
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  private deleteTrip(): void {
    console.log('Inside TripLIstingComponent#deleteTrip');
    // Confirm the delete of trip
    const confirmDelete = confirm("Are you sure you want to delete this trip?");

    if (confirmDelete) {
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
