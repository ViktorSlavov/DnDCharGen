import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { ClassModule } from '../component/class/class.module';

@NgModule({
    imports: [CommonModule, ClassModule],
    declarations: [MainComponent],
    exports: [MainComponent]
})

export class MainModule {

}
