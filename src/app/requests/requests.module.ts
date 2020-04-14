import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from './../shared/shared.module';
import { RequestsPage } from './requests.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: RequestsPage }])
    ],
    declarations: [RequestsPage]
})
export class RequestsPageModule { }
