import { Component } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    title = 'habitify-frontend';

    constructor(private spotifyService: SpotifyService) {}

    spotifyLogin(): void {
        this.spotifyService.login().subscribe();
    }
}
