import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

/* 
  This component takes data from the form and creates a new trip
  by sending data to the API 
*/

@Component({
selector: 'app-add-trip',
templateUrl: './add-trip.component.html',
styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private tripService: TripDataService) { }

  // Upon creating a new form, open fields for admin to add data to
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
  // Upon submiting the form, add trip to DB via tripService
  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
      .then( data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }

// get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}

