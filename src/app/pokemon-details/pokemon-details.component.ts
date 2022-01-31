import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokeapiService } from '../services/pokeapi.service';

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

  /* Ao inicializar, faz uma inscrição no Observable responsável
  *  por ficar de olho nos path parameters que vêm na rota
  *  que é o id do pokemon a serem mostrado, e o captura.
  */
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
