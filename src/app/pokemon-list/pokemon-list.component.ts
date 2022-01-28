import { Component, OnInit } from '@angular/core';

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

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {    
    this.pokeapiService.setListLimit(this.listLimit);
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

  // getPokemonImage(pokemonId: number){
  //   return this.pokeapiService.getPokemonSprite(`${pokemonId}`);
  // }


  onPreviousClick() {

  }

  onNextClick() {

  }

  onSearchClick(pokemonSearch: string) {
    this.returnToList = true
    this.pokeapiService.getPokemonSearch(pokemonSearch).subscribe(
      res => this.pokemonArray
    );
  }

  onReturnClick(){
    this.returnToList = false;
  }

  changeListLimit() {
    this.pokeapiService.setListLimit(this.listLimit);
  }

  ngOnChanges() {
    if(this.returnToList === false){
      this.pokeapiService.getPokemonList().subscribe(
        res => this.pokemonArray = res
      );
    }
  }

}
