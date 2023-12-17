import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

// Route to give components control
const routes: Routes = [
    // POST trip path
    { path: 'add-trip', component: AddTripComponent },
    // PUT trip path
    { path: 'edit-trip', component: EditTripComponent },
    // LOGIN path
    { path: 'login', component: LoginComponent },
    // LOGIN path
    { path: 'register', component: RegisterComponent },
    // GET trip list path
    { path: 'list-trips', component: TripListingComponent },
    // default path
    { path: '', component: HomeComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };