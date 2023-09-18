import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMasonryModule } from 'ngx-masonry';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TransactionItemComponent } from './page/transaction-item/transaction-item.component';
import { TransactionDetailsComponent } from './page/transaction-details/transaction-details.component';
import { DateFormatPipe } from 'src/app/pipe/date-format/date-format.pipe';
import { MaterialModule } from 'src/app/shared/material.module';
import { TokensComponent } from './page/tokens/tokens.component';

@NgModule({
    declarations: [HomeComponent, TransactionItemComponent, TransactionDetailsComponent, DateFormatPipe, TokensComponent],
    imports: [SharedModule, CommonModule, HomeRoutingModule, NgxMasonryModule, MaterialModule],
    exports: [DateFormatPipe]
})
export class HomeModule {}
