import { Component, OnInit, Inject } from '@angular/core';
import { RemoteService, ENDPOINTS } from '../services/remoteData.service';
import { NamedAPIResourceReference } from '../util/interfaces';
import { Observable } from '../../../node_modules/rxjs';

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

  public classes$: Observable<Array<NamedAPIResourceReference>>;
  constructor(@Inject(RemoteService) private remoteService: RemoteService) { }

  genericDataCallback(data: RequestResponse) {
     data.results.map(e => {
       console.log(e.name);
     });
  }

  refresh() {
    this.classes$ = this.remoteService.getEndpoints('CLASSES');
  }
  ngOnInit() {
    this.classes$ = this.remoteService.getEndpoints('CLASSES');
  }

}
