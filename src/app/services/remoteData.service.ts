import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { Http } from '@angular/http';
import { NamedAPIResourceReference, Class, PROFICIENCY_TYPES, Skill } from '../util/interfaces';

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
};

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

    private _absoluteCache = {};

    private remoteData: Observable<any[]>;
    private _remoteData: BehaviorSubject<any[]>;
    private url = `http://www.dnd5eapi.co/api/`;
    private picturesUrl = `http://placeholder.pics/svg/100x100/888888/EEE/`;
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

    public enhanceWithIcon(obj): void {
        obj.icon = `${this.picturesUrl}${obj.name}`;
        return obj;
    }
    classPipe(obj: Class): Class {
        console.log("In class pipe");
        obj.skills = obj.proficiency_choices[0].from.filter(e => e.name.indexOf('Skill: ') > -1).map(
            (e) => this.getSkills(e.url).pipe(take(1))
        );
        return obj;
    }
    buildEndpointURL(endpoint: string): string {
        return `${this.url}${endpoint}/`;
    }

    private checkAbsoluteCache(url): Observable<NamedAPIResourceReference> {
        const resourceBase = url.split(this.url)[1].split('/')[0];
        const resourceSpecific = url.split(this.url)[1].split('/')[1];
        if (!this._absoluteCache[resourceBase]) {
            this._absoluteCache[resourceBase] = {};
        }
        return this._absoluteCache[resourceBase][resourceSpecific];
    }
    private cacheAbsoluteURL(url): Observable<NamedAPIResourceReference> {
        const resourceBase = url.split(this.url)[1].split('/')[0];
        return this.http.get(url).pipe(map(response => response.json()), map((e) => resourceBase === 'classes' ? this.classPipe(e) : e));
    }

    public getAbsoluteURL(url: string): Observable<NamedAPIResourceReference> {
        let cache = this.checkAbsoluteCache(url);
        if (!cache) {
            cache = this.cacheAbsoluteURL(url);
        }
        return cache;
    }

    public getQuery(url): Observable<NamedAPIResourceReference> {
        return this.http.get(url).pipe(
            map(response => response.json().results[0])
        );
    }

    public getSkills(name): any {
        return this.getQuery(`${this.url}skills/?name${name}`).pipe(take(1),
            map(e => this.getAbsoluteURL(e.url)));
    }
}

