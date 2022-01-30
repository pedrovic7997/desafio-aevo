import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokeapiPokemon } from '../pokeapi-pokemon';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  private subscription: Subscription;
  
  pokemonId: number;
  addIconSrc: string = 'assets/images/icon-plus.png'

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pokemonId = params['id'];
      }
    );
  }

  addPokemonToCompare(): void {
    this.pokeapiService.addPokemon(this.pokemonId);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
