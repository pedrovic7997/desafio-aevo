import { Component, OnInit} from '@angular/core';

import { PokeapiListItem } from '../../interfaces/pokeapi-list-item';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  // Valor inicial padrão
  listLimit: number = 20;

  readonly previousArrowSrc: string = 'assets/images/icons-prev.png';
  readonly nextArrowSrc: string = 'assets/images/icons-next.png';

  // Objeto contendo a lista de pokemons
  pokemonArray: PokeapiListItem[];

  pokemonSearch: string = '';
  returnToList: boolean = false;
  noMatch: boolean = false;
  
  previousButtonTitle: string = `Voltar para os ${this.listLimit} anteriores`;
  nextButtonTitle: string = `Avançar para os ${this.listLimit} próximos`;

  constructor(private pokeapiService: PokeapiService) { }

  /* Ao inicializar, seta o valor limite inicial da lista
  *  e faz a inscrição no Observable para receber o 
  *  array de pokemons a serem mostrados
  */
  ngOnInit(): void {
    this.pokeapiService.setListLimit(this.listLimit);
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

  /* No clicar do botão 'anterior', a nova listagem com os pokemons
  *  anteriores é carregada.
  */
  onPreviousClick(): void {
    let hasUrl: boolean = this.pokeapiService.getPreviousRequest();
    if(hasUrl){
      this.pokeapiService.getPokemonList().subscribe(
        res => this.pokemonArray = res
      );
    }
  }

  /* No clicar do botão 'próximo', a nova listagem com os pokemons
  *  seguintes é carregada.
  */
  onNextClick(): void {
    let hasUrl: boolean = this.pokeapiService.getNextRequest();
    if(hasUrl){
      this.pokeapiService.getPokemonList().subscribe(
        res => this.pokemonArray = res
      );
    }
  }

  /* No clicar do 'Buscar', o botão de retornar é ativado,
  *  e a lista é atualizada com o que foi buscado.
  */
  onSearchClick(pokemonSearch: string): void {
    this.returnToList = true;
    this.noMatch = false;
    this.pokemonSearch = pokemonSearch.toLowerCase().replace(/ /gi, "-");
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

  /* Remove o 'Retornar' e recupera a listagem completa
  *  original
  */
  onReturnClick(): void {
    this.returnToList = false;
    if(this.noMatch === true) this.noMatch = false;
    this.pokemonSearch = '';
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

  // Depois de alterado o limite, no blur atualiza a lista
  onBlurLimit(): void {
    this.pokeapiService.setListLimit(this.listLimit);
    this.pokeapiService.getPokemonList().subscribe(
      res => this.pokemonArray = res
    );
  }

}
