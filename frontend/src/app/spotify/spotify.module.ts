import {NgModule} from "@angular/core";
import {SharedModule} from "../common/shared.module";
import { SpotifyLoginComponent } from "./login/login.component";

@NgModule({
    declarations: [SpotifyLoginComponent],
    imports: [SharedModule],
    exports: [SpotifyLoginComponent],
    providers: []
})
export class SpotifyModule {}
