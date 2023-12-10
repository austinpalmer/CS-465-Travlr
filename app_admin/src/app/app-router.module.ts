import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';

// Route to give components control
const routes: Routes = [
    // POST trip path
    { path: 'add-trip', component: AddTripComponent },
    // default path
    { path: '', component: TripListingComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };