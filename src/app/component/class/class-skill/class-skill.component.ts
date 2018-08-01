import { Component, OnInit, Input } from '@angular/core';
import { ClassReference } from '../../../util/interfaces';

@Component({
  selector: 'app-class-skill',
  templateUrl: './class-skill.component.html',
  styleUrls: ['./class-skill.component.css']
})
export class ClassSkillComponent implements OnInit {
  @Input()
  public classes: ClassReference[] = [];

  @Input()
  public description = '';

  @Input()
  public name = '';

  @Input()
  public modifier: {
    icon: string,
    name: string,
    url: string,
  } = {
      name: '',
      icon: '',
      url: ''
    };
  constructor() { }


  ngOnInit() {
  }

}
