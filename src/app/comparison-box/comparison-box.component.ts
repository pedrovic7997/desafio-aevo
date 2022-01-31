import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Comparison } from '../comparison';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'comparison-box',
  templateUrl: './comparison-box.component.html',
  styleUrls: ['./comparison-box.component.css']
})
export class ComparisonBoxComponent implements OnInit {
  
  private subscription: Subscription;
  
  readonly emptyPokemonBoxSrc: string = 'assets/images/empty-pokemon-box.png';

  pokemonBox1Src: string = this.emptyPokemonBoxSrc;
  pokemonBox2Src: string = this.emptyPokemonBoxSrc;
  clearBoxHoverText: string = 'Clique para remover o Pokemon';
  clearButtonSrc: string = 'assets/images/icon-close.png';
  versusSrc: string = 'assets/images/versus-icon.png';

  comparison: Comparison = {id1: -1, id2: -1};

  isPokemon1Set: boolean = false;
  isPokemon2Set: boolean = false;

  constructor(
    private router: Router,
    private pokeapiService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.subscription = this.pokeapiService.pokemonAdded.subscribe(
      res => {
        if(this.isPokemon1Set === false){
          this.isPokemon1Set = true;
          this.pokemonBox1Src =
            this.pokeapiService.getPokemonSpriteUrl(`${res}`);
          this.comparison.id1 = res;
        }
        else if(this.isPokemon2Set === false){
          this.isPokemon2Set = true;
          this.pokemonBox2Src =
            this.pokeapiService.getPokemonSpriteUrl(`${res}`);
          this.comparison.id2 = res;
        }
      }
    );
  }

  unsetPokemon1(): void {
    this.isPokemon1Set = false;
    this.comparison.id1 = -1;
    this.pokemonBox1Src = this.emptyPokemonBoxSrc;
  }

  unsetPokemon2(): void {
    this.isPokemon2Set = false;
    this.comparison.id2 = -1;
    this.pokemonBox2Src = this.emptyPokemonBoxSrc;
  }

  compare(): void {
    this.router.navigate(['/compare'],
      { queryParams: this.comparison });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
