import { Component, ViewChild, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirectve } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
      
    isLoginMode = false;
    isLoading = false;
    errorBanner: string = null;
    @ViewChild(PlaceholderDirectve) alertHost: PlaceholderDirectve;
    private closeSub: Subscription;
    private storeSub: Subscription;
    constructor(
            private componentFactoryResolver: ComponentFactoryResolver,
            private store: Store<fromApp.AppState>
    ) { }
    
    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.errorBanner = authState.authError;
            if (this.errorBanner) {
                this.showErrorAlert(this.errorBanner);
            }
        })
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const pass = form.value.password;
        if(this.isLoginMode) {
            // authObs = this.authService.login(email, pass);
            this.store.dispatch(new AuthActions.LoginStart({email: email, password: pass}))
        } else {
            this.store.dispatch(new AuthActions.SignupStart({email: email, password: pass}))
        }
        
        form.reset();
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError())
    }

    private showErrorAlert(message: string) {
        //Wrong: const alertCmp = new AlertComponent();
        const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.closeEvent.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })

    }

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

}