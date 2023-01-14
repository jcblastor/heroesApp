import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    .card__container {
      max-width: 100vw;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap:10px;
    }

  `]
})
export class ListadoComponent implements OnInit {
  heroes : Heroe[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe( resp => this.heroes = resp);
  }
}
