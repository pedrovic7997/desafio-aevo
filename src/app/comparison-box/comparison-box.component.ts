import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comparison-box',
  templateUrl: './comparison-box.component.html',
  styleUrls: ['./comparison-box.component.css']
})
export class ComparisonBoxComponent implements OnInit {

  readonly emptyPokemonBoxSrc: string = 'assets/images/empty-pokemon-box.png';

  PokemonBox1Src: string = this.emptyPokemonBoxSrc;
  PokemonBox2Src: string = this.emptyPokemonBoxSrc;
  clearBoxHoverText: string = 'Clique para remover o Pokemon';
  clearButtonSrc: string = 'assets/images/icon-close.png';
  versusSrc: string = 'assets/images/versus-icon.png';

  constructor() { }

  ngOnInit(): void {
  }

}
