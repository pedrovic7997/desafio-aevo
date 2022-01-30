import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-pokemon-comparison',
  templateUrl: './pokemon-comparison.component.html',
  styleUrls: ['./pokemon-comparison.component.css']
})
export class PokemonComparisonComponent implements OnInit {

  private subscription: Subscription;

  pokemonId1: number;
  pokemonId2: number;

  pokemon1TotalStats: number;
  pokemon2TotalStats: number;

  constructor(
    private router: Router,
    private pokeapiService: PokeapiService
  ) { }

  ngOnInit(): void {
    this.subscription = this.pokeapiService.compare.subscribe(
      res => {
        this.pokemonId1 = res.id1;
        this.pokemonId2 = res.id2;
      }
    );
    console.log(this.pokemon1TotalStats);
    console.log(this.pokemon2TotalStats);
  }

  getPokemon1TotalStat(totalStat: number): void {
    this.pokemon1TotalStats = totalStat;
  }

  getPokemon2TotalStat(totalStat: number): void {
    this.pokemon2TotalStats = totalStat;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
