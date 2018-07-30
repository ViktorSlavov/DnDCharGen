import { Component, OnInit, Inject } from '@angular/core';
import { RemoteService, ENDPOINTS } from '../services/remoteData.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [RemoteService]
})
export class MainComponent implements OnInit {

  constructor(@Inject(RemoteService) private remoteService: RemoteService) { }

  genericDataCallback(data) {
     data.results.map(e => {
       console.log(e.name);
     });
  }

  ngOnInit() {
    this.remoteService.getData(this.remoteService.buildEndpointURL(ENDPOINTS.CLASSES), this.genericDataCallback);
  }

}
