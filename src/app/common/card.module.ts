import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CardPage } from 'src/app/shared/components/card/card.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
    ],
    declarations: [CardPage],
    exports: [CardPage]
})
export class CardPageModule { }
