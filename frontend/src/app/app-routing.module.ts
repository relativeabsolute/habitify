import { SpotifyAuthGuard } from './spotify/spotify-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'spotify',
        canLoad: [SpotifyAuthGuard],
        loadChildren: () =>
            import('./spotify/spotify.module').then((m) => m.SpotifyModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
