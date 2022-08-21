import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [],
    imports: [MatButtonModule, HttpClientModule],
    exports: [MatButtonModule, HttpClientModule],
})
export class SharedModule {}
