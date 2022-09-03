import {Component} from "@angular/core";
import {environment} from "src/environments/environment";

@Component({
    selector: 'app-spotify-login',
    templateUrl: './login.component.html'
})
export class SpotifyLoginComponent {
    loginUrl = `${environment.apiBaseUrl}/spotify/login`;
}
