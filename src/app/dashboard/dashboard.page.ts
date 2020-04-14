import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StateService } from './../services/state/state.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['dashboard.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
    unclaimedRequests$ = this.stateService.unclaimedRequests$;
    personSupporting$ = this.stateService.personSupporting$;

    constructor(private stateService: StateService) { }
}
