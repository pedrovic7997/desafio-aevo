import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

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

  // Metodos para atender a listagem dos Pokemon

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

  verifyPokemonSearch(pokemonSearch: string): Observable<Array<PokeapiListItem>> {
    this.requestPokemonUrl = this.pokemonItemSrc + pokemonSearch;
    let verifierPokemonListBuilder: PokeapiListItem[] = [];
    return this.http
      .get<PokeapiPokemon>(this.requestPokemonUrl, {observe: 'response'})
      .pipe(map( res => {
        verifierPokemonListBuilder.push(
          <PokeapiListItem>{
            name: res.body?.name,
            url: this.pokemonItemSrc+`${res.body?.id}/`
          });
        return verifierPokemonListBuilder;
      } ))
      .pipe(catchError(
        err => {
          return of(Array<PokeapiListItem>());
        }
      ))
    ;
  }

  getPokemonSpriteUrl(pokemonId: string){
    this.requestImageUrl = this.pokemonItemImgSrc +
      pokemonId + '.png';
    return this.requestImageUrl;
  }
  
  setListLimit(listLimit: number){
    this.listLimit = listLimit;
    this.requestListUrl = this.pokemonItemSrc +
      `?limit=${this.listLimit}`;
  }

  getNextRequest(): boolean {
    if(this.currentNext !== ''){
      this.requestListUrl = this.currentNext;
      return true;
    } else {
      return false;
    }
  }

  getPreviousRequest(): boolean {
    if(this.currentPrevious !== ''){
      this.requestListUrl = this.currentPrevious;
      return true;
    } else {
      return false;
    }
  }

  // Metodos para busca de detalhes dos Pokemons

  getPokemonDetails(pokemonId: number): Observable<PokeapiPokemon> {
    this.requestPokemonUrl = this.pokemonItemSrc + `${pokemonId}/`;
    return this.http.get<PokeapiPokemon>(this.requestPokemonUrl);
  }

  // Metodos utilitarios

  extractPokemonId(pokemonUrl: string): number {
    let id: string = pokemonUrl.split("/")[6];
    return id ? Number(id) : -1;
  }
}
