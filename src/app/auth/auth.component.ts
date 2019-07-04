import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = false;
    isLoading = false;
    errorBanner: string = null;
    constructor(private authService: AuthService, private router: Router){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const pass = form.value.password;
        this.isLoading = true;
        let authObs: Observable<AuthResponseData>;
        if(this.isLoginMode) {
            authObs = this.authService.login(email, pass);
        } else {
            authObs = this.authService.signup(email, pass);
        }

        authObs.subscribe(
            resData => {
                console.log('signup response: ', resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, 
            errorMessage => {
                console.log('signup error: ', errorMessage);
                this.errorBanner = errorMessage;
                this.isLoading = false;
            })
        
        form.reset();
    }

}