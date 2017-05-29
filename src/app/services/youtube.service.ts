import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

 private youTubeURL : string = "https://www.googleapis.com/youtube/v3";
 private apiKey : string = "AIzaSyAkaWv4b5dBGna51-RrNYXiLSBDaeFWdYg";
 private playlist: string = "UUK0_zBeybLuyXbOcHp7wmJA";
 private nextToken : string = "";

  constructor(public http:Http) { }

  getVideos(){

    let url = `${ this.youTubeURL }/playlistItems`;
    let params = new URLSearchParams();


    params.set('key', this.apiKey);
    params.set('part','snippet');
    params.set('maxResults','10');
    params.set('playlistId', this.playlist);

    if(this.nextToken)
      params.set("pageToken",this.nextToken);


   return this.http.get( url, {search: params} )
     .map( respuesta => {
       console.log(respuesta.json());
       this.nextToken = respuesta.json().nextPageToken;

       let videos : any[] = [];

       for (let video of respuesta.json().items){
          let snippet = video.snippet;
          videos.push( snippet );
       }

       return videos;

     });

  }

}
