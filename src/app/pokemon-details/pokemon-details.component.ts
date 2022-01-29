import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokeapiPokemon } from '../pokeapi-pokemon';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemonId: number;
  subscription: Subscription;
  pokemonDetails: PokeapiPokemon;

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
    this.pokeapiService.getPokemonDetails(this.pokemonId)
      .subscribe(
        res => this.pokemonDetails = res
      );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
