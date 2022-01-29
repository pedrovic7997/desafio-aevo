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

  private pokemonId: number;
  private subscription: Subscription;
  pokemonDetails: PokeapiPokemon;
  statsTotal: number = 0;
  addIconSrc: string = 'assets/images/icon-plus.png'
  
  readonly typeColorMap: any = {
    "normal":   {background: "#C0BFA4", fontColor: "#000000"},
    "fire":     {background: "#FF6E30", fontColor: "#FFFFFF"},
    "water":    {background: "#3CADFF", fontColor: "#000000"},
    "grass":    {background: "#8AE751", fontColor: "#000000"},
    "flying":   {background: "#AB9DFF", fontColor: "#000000"},
    "fight":    {background: "#F12B2B", fontColor: "#FFFFFF"},
    "poison":   {background: "#9A59DC", fontColor: "#FFFFFF"},
    "electric": {background: "#F9D936", fontColor: "#000000"},
    "ground":   {background: "#E5D788", fontColor: "#000000"},
    "rock":     {background: "#BAAD69", fontColor: "#000000"},
    "psychic":  {background: "#F9ADAD", fontColor: "#000000"},
    "ice":      {background: "#73EAFB", fontColor: "#000000"},
    "bug":      {background: "#A4BE58", fontColor: "#000000"},
    "ghost":    {background: "#5552CC", fontColor: "#FFFFFF"},
    "steel":    {background: "#BCBCBC", fontColor: "#000000"},
    "dragon":   {background: "#7371C2", fontColor: "#FFFFFF"},
    "dark":     {background: "#463D3D", fontColor: "#FFFFFF"},
    "fairy":    {background: "#E990EB", fontColor: "#000000"}
  };

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
        res => {
          this.pokemonDetails = res;
          this.pokemonDetails.stats.forEach(
            (value) => this.statsTotal += value.base_stat
          );
        }
      );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
