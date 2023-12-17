import { InjectionToken } from "@angular/core";

// Allows for access to local storage cache in browser
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});