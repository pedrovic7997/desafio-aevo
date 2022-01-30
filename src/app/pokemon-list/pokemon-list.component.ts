import { Component, OnInit, SimpleChanges } from '@angular/core';

import { PokeapiListItem } from '../pokeapi-list-item';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  // Valor inicial padrão
  listLimit: number = 151;

  readonly previousArrowSrc: string = 'assets/images/icons-prev.png';
  readonly nextArrowSrc: string = 'assets/images/icons-next.png';

  pokemonSearch: string = '';
  pokemonArray: PokeapiListItem[];
  returnToList: boolean = false;
  noMatch: boolean = false;

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {    
    this.pokeapiService.setListLimit(this.listLimit);
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

  onPreviousClick(): void {
    let hasUrl: boolean = this.pokeapiService.getPreviousRequest();
    if(hasUrl){
      this.pokeapiService.getPokemonList().subscribe(
        res => this.pokemonArray = res
      );
    }
  }

  onNextClick(): void {
    let hasUrl: boolean = this.pokeapiService.getNextRequest();
    if(hasUrl){
      this.pokeapiService.getPokemonList().subscribe(
        res => this.pokemonArray = res
      );
    }
  }

  onSearchClick(pokemonSearch: string): void {
    this.returnToList = true
    this.pokemonSearch = pokemonSearch.toLowerCase();
    this.pokeapiService
      .verifyPokemonSearch(this.pokemonSearch)
      .subscribe(
        res => {
          if(res.length !== 0){
            this.pokemonArray = res;
          } else {
            this.noMatch = true;
          }
        }
      );
  }

  onReturnClick(): void {
    this.returnToList = false;
    if(this.noMatch === true) this.noMatch = false;
    this.pokemonSearch = '';
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

  onBlurLimit(): void {
    this.pokeapiService.setListLimit(this.listLimit);
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

}
