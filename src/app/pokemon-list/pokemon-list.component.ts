import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  readonly pokemonItemImgSrc: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  readonly pokemonListSrc: string = 'https://pokeapi.co/api/v2/pokemon/';

  listLimit: number = 151;
  listLimitText: string = `Mostrando ${this.listLimit} itens`
  previousArrowSrc: string = 'assets/images/icons-prev.png';
  nextArrowSrc: string = 'assets/images/icons-next.png';
  requestListUrl: string = `${this.pokemonListSrc}`

  constructor() { }

  ngOnInit(): void {
  }


  onPreviousClick(){

  }

  onNextClick(){

  }

  changeListLimit(){

  }

}
