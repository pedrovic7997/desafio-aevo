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

  hideCompare(): void {
    this.showComparison = !this.showComparison;
  }
}
