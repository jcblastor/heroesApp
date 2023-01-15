import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly heroesService: HeroesService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )
    ).subscribe(heroe => this.heroe = heroe);
  }

  // metodo para regresar en la navegacion
  regresar(): void {
    this.router.navigate(['/heroes/listado'])
  }

}
