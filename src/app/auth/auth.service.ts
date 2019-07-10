import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    private tokenExpitationTimer: any;
    constructor( private store: Store<fromApp.AppState>) {}

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpitationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout())
        }, expirationDuration)
    }
    clearLogoutTimer() {
        if(this.tokenExpitationTimer) {
            clearTimeout(this.tokenExpitationTimer);
            this.tokenExpitationTimer = null;
        }
    }
} 