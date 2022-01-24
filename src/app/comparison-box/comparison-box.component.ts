import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comparison-box',
  templateUrl: './comparison-box.component.html',
  styleUrls: ['./comparison-box.component.css']
})
export class ComparisonBoxComponent implements OnInit {

  PokemonBox1Src: string = '';
  PokemonBox2Src: string = '';
  clearBoxSrc: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
