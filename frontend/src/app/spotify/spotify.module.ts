import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../common/shared.module';
import { SpotifyLoginComponent } from './login/login.component';
import { SpotifyRoutingModule } from './spotify-routing.module';

@NgModule({
    declarations: [SpotifyLoginComponent],
    imports: [CommonModule, SharedModule, SpotifyRoutingModule],
    exports: [CommonModule, SpotifyLoginComponent],
    providers: [],
})
export class SpotifyModule {}
