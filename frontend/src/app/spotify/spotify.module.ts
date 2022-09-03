import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';
import { SpotifyLoginComponent } from './login/login.component';
import { SpotifyRoutingModule } from './spotify-routing.module';

@NgModule({
    declarations: [SpotifyLoginComponent],
    imports: [SharedModule, SpotifyRoutingModule],
    exports: [SpotifyLoginComponent],
    providers: [],
})
export class SpotifyModule {}
