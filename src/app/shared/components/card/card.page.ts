import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPage {
    @Input() name: string | number;
    @Input() content: string | number;
}
