import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PokeapiListItem } from '../pokeapi-list-item';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemonItem: PokeapiListItem;
  
  @Output() pokemonSelected = new EventEmitter();
  @Output() pokemonAdded = new EventEmitter();
  
  pokemonId: number;
  imageUrl: string;
  addIconSrc: string = 'assets/images/icon-plus.png';

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit(): void {
    this.pokemonId = this.pokeapiService
      .extractPokemonId(this.pokemonItem.url);
    this.imageUrl = this.pokeapiService
      .getPokemonSpriteUrl(`${this.pokemonId}`);
  }

  onAddClick(): void {
    this.pokemonAdded.emit({
      pokemonItem: this.pokemonItem,
      pokemonId: this.pokemonId,
      imageUrl: this.imageUrl
    });
  }

  onPokemonClick(): void {
    this.pokemonSelected.emit({
      pokemonItem: this.pokemonItem
    });
  }

}
