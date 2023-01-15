import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    .card__container {
      max-width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap:10px;
    }

    .heroe {
      max-width: 95%;
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
