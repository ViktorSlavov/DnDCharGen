import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

export enum ENDPOINTS {
    RACES = 'races',
    SUBRACES = 'subraces',
    CLASSES = 'classes',
    SUBCLASSES = 'subclasses',
    LANGUAGES = 'languages',
    SPELLCASTING = 'spellcasting',
    SPELLS = 'spells',
    MONSTERS = 'monsters',
    FEATURES = 'features',
    TABLES = 'tables',
    EQUIPMENT = 'equipment',
    PROFICIESNCIES = 'proficiencies',
    STARTING_EQUIPMENT = 'startingequipment',
}


@Injectable()
export class RemoteService {

    remoteData: Observable<any[]>;
    _remoteData: BehaviorSubject<any[]>;
    url = `http://www.dnd5eapi.co/api/`;
    constructor(private http: Http) {
        this._remoteData = new BehaviorSubject([]);
        this.remoteData = this._remoteData.asObservable();
    }

    getData(url, cb?: (any) => void) {
        return this.http
            .get(url)
            .subscribe((d: any) => {
                this._remoteData.next(d);
                if (cb) {
                    cb(JSON.parse(d._body));
                }
            });
    }

    buildEndpointURL(endpoint: ENDPOINTS): string {
        return `${this.url}${endpoint}/`;
    }
}

