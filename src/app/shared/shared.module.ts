import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash,
    faTimes,
    faCaretUp,
    faCaretDown,
    faExclamationTriangle,
    faFilter,
    faTasks,
    faCheck,
    faSquare,
    faLanguage,
    faPaintBrush,
    faLightbulb,
    faWindowMaximize,
    faStream,
    faBook,
    faUserCircle,
    faAsterisk,
    faEye,
    faEyeSlash,
    faSquareArrowUpRight,
    faBackward,
    faChevronDown,
    faEllipsisV,
    faRefresh,
    faPaperPlane,
    faDownload
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
    declarations: [SpinnerComponent],
    exports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, SpinnerComponent]
})
export class SharedModule {
    constructor(faIconLibrary: FaIconLibrary) {
        faIconLibrary.addIcons(
            faBackward,
            faPlus,
            faEdit,
            faTrash,
            faTimes,
            faCaretUp,
            faCaretDown,
            faExclamationTriangle,
            faFilter,
            faTasks,
            faCheck,
            faSquare,
            faLanguage,
            faPaintBrush,
            faLightbulb,
            faWindowMaximize,
            faStream,
            faBook,
            faUserCircle,
            faAsterisk,
            faEye,
            faEyeSlash,
            faSquareArrowUpRight,
            faChevronDown,
            faEllipsisV,
            faRefresh,
            faPaperPlane,
            faDownload
        );
    }
}
