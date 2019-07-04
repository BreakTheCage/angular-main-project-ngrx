import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Firebase Guide:
//https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
interface AuthResponseData {
    kind:string ,
    idToken: string ,
    email: string ,
    refreshToken: string ,
    expiresIn: string ,
    localId: string 
}
Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCD8RYEELYYN4OzAvSLhkVI4Tm03S6miME',
            { 
                email: email,
                password: password,
                returnSecureToken: true
            });
    }
}