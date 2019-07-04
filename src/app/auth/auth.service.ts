import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
interface AuthResponseData {
    kind:string ,
    idToken: string ,
    email: string ,
    refreshToken: string ,
    expiresIn: string ,
    localId: string 
}
@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCD8RYEELYYN4OzAvSLhkVI4Tm03S6miME',
            { 
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(catchError(errorRes => {
                let errorMessage = 'An unknown error occurred!';
                if(!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email is already exist! Do you want to Signin?';
                        break;
                
                    default:
                        break;
                }
                return throwError(errorMessage);
            }));
    }

    //https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    login(email: string, password: string) {
        this.http.post(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCD8RYEELYYN4OzAvSLhkVI4Tm03S6miME',
            { 
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    }
}