import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
import { interval, Observable, of, Subject } from 'rxjs';

import { PokeapiListResponse } from '../interfaces/pokeapi-list-response';
import { PokeapiListItem } from '../interfaces/pokeapi-list-item';
import { PokeapiPokemon } from '../interfaces/pokeapi-pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly pokemonItemImgSrc: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private readonly pokemonItemSrc: string = 'https://pokeapi.co/api/v2/pokemon/';

  pokemonAdded = new EventEmitter<number>();
  
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

  getPokemonSpriteUrl(pokemonId: string): string{
    this.requestImageUrl = this.pokemonItemImgSrc +
      pokemonId + '.png';
    return this.requestImageUrl;
  }
  
  setListLimit(listLimit: number): void{
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

  // Metodos para comunicacao entre Componentes

  addPokemon(pokemonId: number): void {
    this.pokemonAdded.emit(pokemonId);
  }
  
  // Metodos utilitarios

  extractPokemonId(pokemonUrl: string): number {
    let id: string = pokemonUrl.split("/")[6];
    return id ? Number(id) : -1;
  }
}
