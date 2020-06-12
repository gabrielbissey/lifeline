import { RequestStatusEnum } from './../shared/models/enums';
import { StateService } from './../services/state/state.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HttpService } from './../services/http/http.service';

@Component({
    selector: 'app-requests',
    templateUrl: 'requests.page.html',
    styleUrls: ['requests.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPage {
    unclaimedRequests$ = this.http.get('get-requests', {
        user: this.stateService.personSupporting,
        status: RequestStatusEnum.UNCLAIMED
    });

    constructor(private http: HttpService,
                private stateService: StateService) { }
}
