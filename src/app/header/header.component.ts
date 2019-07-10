import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as formApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<formApp.AppState>) { }

    ngOnInit(): void { 
        //if we have user It means we are Authenticated
        // this.userSub = this.authService.user.subscribe(user => {
        this.userSub = this.store.select('auth')
            .pipe(map(authState =>  authState.user))
            .subscribe(user => {
                console.log('Inside ngOninit authService.user.subscribe');
                this.isAuthenticated = !!user;
            })
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    } 
    onLogout() {
        // this.authService.logout();
        this.store.dispatch( new AuthActions.Logout());
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    
}
