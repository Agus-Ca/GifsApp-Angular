import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../Interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  constructor(private http:HttpClient) {}

  private apiKey:string = 'h1kKoTaW5gIMHI0E516yKllIHPc8E73n';
  private _historial: string[] = [];

  public resultados:Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = ''): void {
    query = query.trim().toLocaleLowerCase();
    
    if ( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=h1kKoTaW5gIMHI0E516yKllIHPc8E73n&q=${query}&limit=10`)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      })
  }
}