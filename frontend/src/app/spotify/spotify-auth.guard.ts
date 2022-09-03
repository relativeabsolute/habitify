import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export class SpotifyAuthGuard implements CanLoad {
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return true; // TODO: fill in
    }
}
