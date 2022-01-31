import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonComparisonComponent } from './pokemon-comparison/pokemon-comparison.component';
import { ComparisonBoxComponent } from './comparison-box/comparison-box.component';
import { PokeapiService } from './services/pokeapi.service';
import { PokemonListItemComponent } from './pokemon-list-item/pokemon-list-item.component';
import { RemoveDashPipe } from './pipes/remove-dash.pipe';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonComparisonComponent,
    ComparisonBoxComponent,
    PokemonListItemComponent,
    RemoveDashPipe,
    PokemonCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PokeapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
