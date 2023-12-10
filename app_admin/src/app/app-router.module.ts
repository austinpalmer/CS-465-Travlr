import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

// Route to give components control
const routes: Routes = [
    // POST trip path
    { path: 'add-trip', component: AddTripComponent },
    // PUT trip path
    { path: 'edit-trip', component: EditTripComponent },
    // default path
    { path: '', component: TripListingComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };