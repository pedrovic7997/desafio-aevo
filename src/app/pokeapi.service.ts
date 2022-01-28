import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PokeapiListResponse } from './pokeapi-list-response';
import { PokeapiListItem } from './pokeapi-list-item';
import { PokeapiPokemon } from './pokeapi-pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly pokemonItemImgSrc: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private readonly pokemonItemSrc: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  private requestListUrl: string = '';
  private requestPokemonUrl: string = '';
  private listLimit: number;
  private requestImageUrl: string;
  private currentNext: string = '';
  private currentPrevious: string = '';

  constructor(private http: HttpClient) { }

  // Métodos para atender o PokemonListComponent

  getPokemonList(): Observable<Array<PokeapiListItem>>{
    return this.http.get<PokeapiListResponse>(this.requestListUrl)
      .pipe(map(
        res => {
          if(typeof res?.next !== null){
            this.currentNext = res?.next;            
          } else {
            this.currentNext = '';
          }
          if(typeof res?.previous !== null){            
            this.currentPrevious = res?.previous;
          } else {
            this.currentPrevious = '';
          }
          return res?.results;
        }
        ));
  }

  getPokemonSearch(pokemonSearch: string): Observable<PokeapiPokemon> {
    this.requestPokemonUrl = this.pokemonItemSrc + pokemonSearch;
    return this.http.get<PokeapiPokemon>(this.requestPokemonUrl);
  }

  getPokemonSpriteUrl(pokemonId: string){
    this.requestImageUrl = this.pokemonItemImgSrc + pokemonId + '.png';
    return this.requestImageUrl;
  }
  
  setListLimit(listLimit: number){
    this.listLimit = listLimit;
    this.requestListUrl = this.pokemonItemSrc + `?limit=${this.listLimit}`;
  }

  getNextRequest(){
    this.requestListUrl = this.currentNext;
    return this.getPokemonList();
  }

  getPreviousRequest(){
    this.requestListUrl = this.currentPrevious;
    return this.getPokemonList();
  }

  // Métodos utilitarios

  extractPokemonId(pokemonUrl: string): number {
    let id: string = pokemonUrl.split("/")[6];
    return id ? Number(id) : -1;
  }
}
