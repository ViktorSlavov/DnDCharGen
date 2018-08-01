import { NgModule } from '@angular/core';
import { ClassSkillComponent } from './class-skill/class-skill.component';
import { ClassDisplayComponent} from './class-display/class-display.component';
import { CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [ClassDisplayComponent, ClassSkillComponent],
    exports: [ClassDisplayComponent, ClassSkillComponent]
})

export class ClassModule {

}
