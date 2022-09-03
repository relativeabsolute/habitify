import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpotifyAuthGuard } from './spotify-auth.guard';
import { SuccessComponent } from './success.component';

const spotifyRoutes: Routes = [
    {
        path: 'success',
        component: SuccessComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(spotifyRoutes)],
    exports: [RouterModule],
})
export class SpotifyRoutingModule {}
