import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Http } from '@angular/http';
import { NamedAPIResourceReference } from '../util/interfaces';

const CACHE_SIZE = 1;
export const ENDPOINTS = {
    RACES: 'races',
    SUBRACES: 'subraces',
    CLASSES: 'classes',
    SUBCLASSES: 'subclasses',
    LANGUAGES: 'languages',
    SPELLCASTING: 'spellcasting',
    SPELLS: 'spells',
    MONSTERS: 'monsters',
    FEATURES: 'features',
    TABLES: 'tables',
    EQUIPMENT: 'equipment',
    PROFICIESNCIES: 'proficiencies',
    STARTING_EQUIPMENT: 'startingequipment',
}

interface RequestResponse {
    count: number;
    results: Array<NamedAPIResourceReference>;
}

@Injectable()
export class RemoteService {

    private _endpointCache: {
        RACES: Observable<any[]>,
        SUBRACES: Observable<any[]>,
        CLASSES: Observable<any[]>,
        SUBCLASSES: Observable<any[]>,
        LANGUAGES: Observable<any[]>,
        SPELLCASTING: Observable<any[]>,
        SPELLS: Observable<any[]>,
        MONSTERS: Observable<any[]>,
        FEATURES: Observable<any[]>,
        TABLES: Observable<any[]>,
        EQUIPMENT: Observable<any[]>,
        PROFICIESNCIES: Observable<any[]>,
        STARTING_EQUIPMENT: Observable<any[]>
    } = <any>{};


    private remoteData: Observable<any[]>;
    private _remoteData: BehaviorSubject<any[]>;
    private url = `http://www.dnd5eapi.co/api/`;
    constructor(private http: Http) {
        this._remoteData = new BehaviorSubject([]);
        this.remoteData = this._remoteData.asObservable();
    }


    public getEndpoints(endpointName: string): Observable<any[]> {
        if (!this._endpointCache[endpointName]) {
            this._endpointCache[endpointName] = this.getEndpointData(endpointName).pipe(shareReplay(CACHE_SIZE));
        }

        return this._endpointCache[endpointName];
    }

    private getEndpointData(endpoint: string) {
        return this.http.get(this.buildEndpointURL(endpoint)).pipe(
            map(response => <RequestResponse>response.json().results)
          );
    }

    getData(url) {
        return this.http.get(this.url).pipe(
            map(response => response.json())
          );
    }

    buildEndpointURL(endpoint: string): string {
        return `${this.url}${endpoint}/`;
    }
}

