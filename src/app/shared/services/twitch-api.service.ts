import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { TWITCH_API_KEY } from '../constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TwitchApiService {
    base_url: string = 'https://api.twitch.tv/kraken/videos/top?';
    // tslint:disable-next-line:max-line-length
    search_url: string = 'https://api.twitch.tv/kraken/search/games?query=';
    client_id: any   =  'j9ybq0hpyrlo4pgczcefitgg50lzvs';

    constructor(
        private http: Http
    ){}

    public getStreams(): Observable<any> {
        let api = this.base_url + 'client_id=' + this.client_id + '&type=suggest'
        return this.http.get(api)
        .map(results => {
            let res = results.json();
            return res.videos;
        });
    }

    public searchVideos(query: any): Observable<any> {
        let api = this.search_url + query + '&client_id=' + this.client_id + '&type=suggest';
        return this.http.get(api)
        .map(results => {
            let res = results.json();
            return res.games;
        });
    }
}
