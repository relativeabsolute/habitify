import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpotifyService } from '../services/spotify.service';

@Component({
    selector: 'app-spotify-login',
    templateUrl: './login.component.html',
})
export class SpotifyLoginComponent implements OnInit, OnDestroy {
    loginUrl = `${environment.apiBaseUrl}/spotify/login`;
    private subscriptions: Subscription;
    displayName = '';
    profileImgUrl = '';

    public get buttonText(): string {
        return this.displayName !== ''
            ? this.displayName
            : 'Login with Spotify';
    }

    constructor(private spotifyService: SpotifyService) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.spotifyService.spotifyAuth
                .pipe(
                    switchMap((auth) => {
                        return this.spotifyService.getCurrentProfile(auth);
                    })
                )
                .subscribe((userProfile) => {
                    this.displayName = userProfile.display_name;
                    this.profileImgUrl = userProfile.images[0]?.url ?? '';
                    console.log(this.profileImgUrl);
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
