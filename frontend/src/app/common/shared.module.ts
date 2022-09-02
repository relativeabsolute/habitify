import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [],
    imports: [MatButtonModule, HttpClientModule],
    exports: [MatButtonModule, HttpClientModule],
    providers: [CookieService],
})
export class SharedModule {}
