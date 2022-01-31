import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private route: ActivatedRoute
  ) { }

  /* Ao inicializar, faz uma inscrição no Observable responsável
  *  por ficar de olho nos query parameters que vêm na rota
  *  que são os ids dos pokemons a serem comparados,
  *  e os captura.
  */
  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(
      queryParams => {
        this.pokemonId1 = queryParams['id1'];
        this.pokemonId2 = queryParams['id2'];
      }
    );
  }

  getPokemon1TotalStat(totalStat: number): void {
    this.pokemon1TotalStats = totalStat;
  }

  getPokemon2TotalStat(totalStat: number): void {
    this.pokemon2TotalStats = totalStat;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
