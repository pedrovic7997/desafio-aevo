import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PokeapiListResponse } from '../interfaces/pokeapi-list-response';
import { PokeapiListItem } from '../interfaces/pokeapi-list-item';
import { PokeapiPokemon } from '../interfaces/pokeapi-pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly pokemonItemImgSrc: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  private readonly pokemonItemSrc: string = 'https://pokeapi.co/api/v2/pokemon/';

  // Emissor para acionar o componente Comparison-Box
  pokemonAdded = new EventEmitter<number>();
  
  private requestListUrl: string = '';
  private requestPokemonUrl: string = '';
  private listLimit: number;
  private requestImageUrl: string;
  private currentNext: string = '';
  private currentPrevious: string = '';
  private count: number;

  constructor(private http: HttpClient) { }

  // Metodos para atender a listagem dos Pokemon

  /* Faz a requisição pelo array de pokemons com o limite
  *  já setado e guarda as urls para acessar a próxima lista
  *  ou a anterior.
  */
  getPokemonList(): Observable<Array<PokeapiListItem>>{
    return this.http.get<PokeapiListResponse>(this.requestListUrl)
      .pipe(map(
        res => {
          this.count = res?.count;
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

  /* Faz a verificação se o nome do pokemon consultado retorna
  *  algo da consulta ou se retorna erro. Se retorna algo,
  *  esse método constrói um elemento da lista e retorna
  *  dentro de um array. Se retornar nada, esse método retorna
  *  um array vazio.
  */
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
        () => {
          return of(Array<PokeapiListItem>());
        }
      ))
    ;
  }

  // Monta a url para acessar direto a imagem do pokemon
  getPokemonSpriteUrl(pokemonId: string): string{
    this.requestImageUrl = this.pokemonItemImgSrc +
      pokemonId + '.png';
    return this.requestImageUrl;
  }
  
  setListLimit(listLimit: number): void{
    if(listLimit <= this.count){
      this.listLimit = listLimit;
    } else {
      this.listLimit = this.count;
    }
    this.requestListUrl = this.pokemonItemSrc +
      `?limit=${this.listLimit}`;
  }

  /* Se houver algum endereço para a próxima lista, atualiza
  *  a lista.
  */
  getNextRequest(): boolean {
    if(this.currentNext !== ''){
      this.requestListUrl = this.currentNext;
      return true;
    } else {
      return false;
    }
  }

  /* Se houver algum endereço para a pŕoxima lista, atualiza
  *  a lista.
  */
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
