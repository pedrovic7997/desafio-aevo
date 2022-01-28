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


  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    // TODO: Fazer um Inscription com o Subscribe aqui no 
    // OnInit e Unsubscribe no OnDestroy

    this.pokeapiService.setListLimit(this.listLimit);
    // this.pokemonArray = this.pokeapiService.getPokemonList();
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

  // getPokemonImage(pokemonId: number){
  //   return this.pokeapiService.getPokemonSprite(`${pokemonId}`);
  // }


  onPreviousClick(){

  }

  onNextClick(){

  }

  changeListLimit(){
    this.pokeapiService.setListLimit(this.listLimit);
  }

}
