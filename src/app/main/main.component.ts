import { Component, OnInit, Inject } from '@angular/core';
import { RemoteService, ENDPOINTS } from '../services/remoteData.service';
import { NamedAPIResourceReference, ClassReference } from '../util/interfaces';
import { Observable } from '../../../node_modules/rxjs';
import { take } from '../../../node_modules/rxjs/operators';

interface RequestResponse {
  count: number;
  results: Array<any>;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [RemoteService]
})
export class MainComponent implements OnInit {

  public activeClass: NamedAPIResourceReference;
  public classes$: Array<NamedAPIResourceReference>;
  constructor(@Inject(RemoteService) private remoteService: RemoteService) { }

  genericDataCallback(data: RequestResponse) {
     data.results.map(e => {
       console.log(e.name);
     });
  }

  updateActiveClass(url: string) {
    this.remoteService.getAbsoluteURL(url).pipe(take(2)).subscribe((e) => {
      this.activeClass = <ClassReference>e;
      console.log(this.activeClass, e);
    });

  }
  refresh() {
    this.remoteService.getEndpoints('CLASSES').pipe(take(1)).subscribe((e) => {
      this.classes$ = e;
    });
  }
  ngOnInit() {
    this.remoteService.getEndpoints('CLASSES').pipe(take(1)).subscribe((e) => {
      this.classes$ = e;
    });
  }
}
