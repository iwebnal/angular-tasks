import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User, FbAuthResponse } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthService {
    constructor(private http: HttpClient) {
    }

    get token(): string {
        const expiresDate = new Date(localStorage.getItem('fb-token-exp'));
        if(new Date > expiresDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken)
        );
    }

    logout() {
        this.setToken(null);
    }

    isAuth(): boolean {
        return !!this.token;
    }

    private setToken(response: FbAuthResponse | null) {
        if(response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        }else {
            localStorage.clear();
        }
    }
}