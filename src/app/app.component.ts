import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-aevo';
  name: string = 'Pokedex';
  text: string = "Clique em um Pokemon ou selecione dois e clique em ‘Comparar’";
  showComparison: boolean = true;
  listLimit: number = 151;
  listLimitText: string = `Mostrando ${this.listLimit} itens`
  previousArrowSrc: string = '';
  nextArrowSrc: string = '';
  pokemonSearch: string = '';

  onPreviousClick(){

  }

  onNextClick(){

  }

  changeListLimit(){

  }
}
