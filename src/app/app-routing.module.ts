import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonComparisonComponent } from './pokemon-comparison/pokemon-comparison.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: 'compare', component: PokemonComparisonComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: '', component: PokemonListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
