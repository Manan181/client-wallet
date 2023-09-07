import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';
import { ThemeService } from 'src/app/core/service/theme.service';
import { themes } from 'src/app/core/constants/theme';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {
    currentTheme: string;

    private overlayContainer: OverlayContainer;

    currentActiveTheme$ = this.themeService.getDarkTheme().pipe(
        map((isDarkTheme: boolean) => {
            const [lightTheme, darkTheme] = themes;

            this.currentTheme = isDarkTheme ? lightTheme.name : darkTheme.name;

            if (this.overlayContainer) {
                const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
                const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
                if (themeClassesToRemove.length) {
                    overlayContainerClasses.remove(...themeClassesToRemove);
                }
                overlayContainerClasses.add(this.currentTheme);
            }

            return this.currentTheme;
        })
    );

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        if (this.overlayContainer) {
            this.overlayContainer.getContainerElement().classList.add(this.currentTheme);
        }
    }
}
