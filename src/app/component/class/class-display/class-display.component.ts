import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Class } from '../../../util/interfaces';

@Component({
  selector: 'app-class-display',
  templateUrl: './class-display.component.html',
  styleUrls: ['./class-display.component.css']
})
export class ClassDisplayComponent implements AfterViewInit {
  @Input()
  public currentClass: Class;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.currentClass);
  }

}
