import { SharedModule } from './common/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { SuccessComponent } from './spotify/success.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SpotifyModule } from './spotify/spotify.module';
import { SpotifyAuthGuard } from './spotify/spotify-auth.guard';

@NgModule({
    declarations: [AppComponent, SuccessComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        MatToolbarModule,
        SpotifyModule,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        SpotifyAuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
