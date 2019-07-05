import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
export interface AuthResponseData {
    kind:string ;
    idToken: string ;
    email: string ;
    refreshToken: string ;
    expiresIn: string ;
    localId: string;
    registered?: boolean ;
}
@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCD8RYEELYYN4OzAvSLhkVI4Tm03S6miME',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
        );
    }
    autoLogin() {
        
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    
    }

    //https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCD8RYEELYYN4OzAvSLhkVI4Tm03S6miME',
            { 
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }));
    }

    private handleError(errorRes: HttpErrorResponse) {   
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email is already exist! Do you want to Signin?';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist! Do you want to Sign up?';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Wrong Password!';
                break;
        
            default:
                break;
        }
        return throwError(errorMessage);
    }
} 