import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../Interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  constructor(private http:HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('lastSearch')!) || [];
  }

  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private apiKey:string = 'h1kKoTaW5gIMHI0E516yKllIHPc8E73n';
  private limit:string = '10';

  private _historial:string[] = [];

  public resultados:Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = ''): void {
    query = query.trim().toLocaleLowerCase();
    
    if ( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.limit)
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('lastSearch', JSON.stringify( this.resultados));
      })


  }
}