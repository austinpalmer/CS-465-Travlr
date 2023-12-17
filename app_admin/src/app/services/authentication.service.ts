import { Inject, Injectable } from '@angular/core'
import { BROWSER_STORAGE } from '../storage'
import { User } from '../models/user'
import { AuthResponse } from '../models/authresponse'
import { TripDataService } from './trip-data.service'

/* 
  This service keeps track of the authentication session by
  allowing the creating and saving of tokens. 
*/

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    // Inject BROWSER_STORAGE to handle JWT
    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private tripDataService: TripDataService
    ) {}
    
    public getToken(): string {
        return this.storage.getItem('travlr-token');
    }

    public saveToken(token: string): void {
        this.storage.setItem('travlr-token', token);
    }

    public login(user: User): Promise<any> {
        return this.tripDataService.login(user)
        .then((authResp: AuthResponse) => this.saveToken(authResp.token));  // Anytime a user login, create new token
    }

    public register(user: User): Promise<any> {
        return this.tripDataService.register(user)
        .then((authResp: AuthResponse) => this.saveToken(authResp.token));  // Anytime a user registers, create new token
    }

    public logout(): void {
        this.storage.removeItem('travlr-token');
    }

    // Handle session by parsing the token, taking the expiration, and compare it to the current date
    public isLoggedIn(): boolean {
        const token: string = this.getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now() / 1000);
        }
        else {
            return false;
        }
    }

    // Retrieve current user information
    public getCurrentUser(): User {
        if (this.isLoggedIn()) {
            const token: string = this.getToken();
            const { email, name } = JSON.parse(atob(token.split('.')[1]));
            return { email, name } as User;
        }
    }
}
