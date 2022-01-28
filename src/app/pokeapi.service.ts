import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PokeapiListResponse } from './pokeapi-list-response';
import { PokeapiListItem } from './pokeapi-list-item';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly pokemonItemImgSrc: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private readonly pokemonListSrc: string = 'https://pokeapi.co/api/v2/pokemon/';
  private requestListUrl: string = '';
  private listLimit: number;

  private requestImageUrl: string;
  private responseBody: any;

  constructor(private http: HttpClient) { }

  // Métodos para atender o PokemonListComponent

  getPokemonList(): Observable<Array<PokeapiListItem>>{
    return this.http.get<PokeapiListResponse>(this.requestListUrl)
      .pipe(map(
        res => res?.results
        ));
  }

  getPokemonSpriteUrl(pokemonId: string){
    this.requestImageUrl = this.pokemonItemImgSrc + pokemonId + '.png';
    return this.requestImageUrl;
  }
  
  setListLimit(listLimit: number){
    this.listLimit = listLimit;
    this.requestListUrl = this.pokemonListSrc + `?${this.listLimit}`;
  }

  getNextRequest(){
    this.requestListUrl = this.responseBody?.next;
    return this.getPokemonList();
  }

  getPreviousRequest(){
    this.requestListUrl = this.responseBody?.previous;
    return this.getPokemonList();
  }

  extractPokemonId(pokemonUrl: string): number {
    let id: string = pokemonUrl.split("/")[6];
    return id ? Number(id) : -1;
  }
}
