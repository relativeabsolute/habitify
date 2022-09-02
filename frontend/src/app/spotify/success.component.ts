import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { cookieKeys } from '../model/constants';

@Component({
    templateUrl: './success.component.html',
})
export class SuccessComponent implements OnInit {
    constructor(private cookieService: CookieService) {}

    ngOnInit(): void {
        const spotifyAuth = this.cookieService.get(
            cookieKeys.SpotifyAuthResponse
        );
        console.log(spotifyAuth);
    }
}
