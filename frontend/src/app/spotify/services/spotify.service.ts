import { environment } from './../../../environments/environment';
import { IUserProfile } from './../../model/user-profile';
import { HttpClient } from '@angular/common/http';
import { ISpotifyAuth } from './../../model/spotify-auth';
import { cookieKeys } from './../../model/constants';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpotifyService {
    private spotifyAuthSubject: Subject<ISpotifyAuth>;
    spotifyAuth: Observable<ISpotifyAuth>;

    constructor(
        private cookieService: CookieService,
        private http: HttpClient
    ) {
        this.spotifyAuthSubject = new Subject();
        this.spotifyAuth = this.spotifyAuthSubject.asObservable();
    }

    isAuthenticated(): boolean {
        const cookie = this.cookieService.get(cookieKeys.SpotifyAuthResponse);
        return cookie !== '' && cookie !== null;
    }

    saveAuthInCookie(auth: ISpotifyAuth) {
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + auth.expires_in);
        this.cookieService.set(
            cookieKeys.SpotifyAuthResponse,
            JSON.stringify(auth),
            expiration
        );
        this.spotifyAuthSubject.next(auth);
    }

    getCurrentProfile(auth: ISpotifyAuth): Observable<IUserProfile> {
        return this.http.get<IUserProfile>(
            `${environment.apiBaseUrl}/spotify/me`,
            {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`,
                },
            }
        );
    }
}
