import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
                    }
                ]
            },
            {
                path: 'requests',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../requests/requests.module').then(m => m.RequestsPageModule)
                    }
                ]
            },
            {
                path: 'calendar',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../calendar/calendar.module').then(m => m.CalendarPageModule)
                    }
                ]
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../settings/settings.module').then(m => m.SettingsPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
