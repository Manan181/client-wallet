import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from 'src/app/core/guard/no-auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ContentLayoutComponent,
        // canActivate: [AuthGuard], // Should be replaced with actual auth guard
        children: [
            {
                path: 'home',
                loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule)
            }
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        canActivate: [NoAuthGuard],
        loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
