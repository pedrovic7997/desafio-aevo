import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { PokeapiListItem } from '../interfaces/pokeapi-list-item';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemonItem: PokeapiListItem;
  
  pokemonId: number;
  imageUrl: string;
  addIconSrc: string = 'assets/images/icon-plus.png';
  addButtonTitle: string = 'Comparar Pokemon';

  constructor(
    private pokeapiService: PokeapiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemonId = this.pokeapiService
      .extractPokemonId(this.pokemonItem.url);
    this.imageUrl = this.pokeapiService
      .getPokemonSpriteUrl(`${this.pokemonId}`);
  }

  onAddClick(): void {
    this.pokeapiService.addPokemon(this.pokemonId);
  }

  onPokemonClick(): void {
    this.router.navigate(['/pokemon', this.pokemonId]);
  }

}
