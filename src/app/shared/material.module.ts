import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatListModule, MatIconModule, MatTabsModule, MatMenuModule],
    exports: [MatToolbarModule, MatButtonModule, MatListModule, MatIconModule, MatTabsModule, MatMenuModule]
})
export class MaterialModule {}
