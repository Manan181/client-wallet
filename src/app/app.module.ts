import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EthersService } from './shared/service/ethers/ethers.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavComponent } from './layout/nav/nav.component';
import { StorageService } from './shared/service/storage/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [AppComponent, AuthLayoutComponent, ContentLayoutComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, AppRoutingModule, AuthModule, SharedModule, CoreModule, BrowserAnimationsModule, MatDialogModule],
    providers: [EthersService, StorageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
