import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-aevo';
  name: string = 'PokeAPI';
  logoSrc: string = 'assets/images/pokeapi-logo.png';
  text: string = "Clique em um Pokemon ou selecione dois e clique em ‘Comparar’";
  showComparison: boolean = true;
  listLimit: number = 151;
  listLimitText: string = `Mostrando ${this.listLimit} itens`
  previousArrowSrc: string = 'assets/images/icons-prev.png';
  nextArrowSrc: string = 'assets/images/icons-next.png';
  // pokemonSearch: string = '';

  onPreviousClick(){

  }

  onNextClick(){

  }

  changeListLimit(){

  }
}
