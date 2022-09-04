import { ISpotifyAuth } from './../model/spotify-auth';
import { Injectable, Injector } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from './services/spotify.service';

@Injectable()
export class SpotifyAuthGuard implements CanLoad {
    protected spotifyService: SpotifyService;
    protected router: Router;

    constructor(injector: Injector) {
        this.spotifyService = injector.get(SpotifyService);
        this.router = injector.get(Router);
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (!this.spotifyService.isAuthenticated()) {
            const spotifyAuth: ISpotifyAuth = this.router.getCurrentNavigation()
                ?.extractedUrl.queryParams as ISpotifyAuth;
            if (!spotifyAuth) {
                return false;
            }
            this.spotifyService.saveAuthInCookie(spotifyAuth);
        }
        return true;
    }
}
