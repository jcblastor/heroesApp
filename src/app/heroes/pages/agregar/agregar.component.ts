import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { switchMap } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width:100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  }

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')) return;

    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.heroesService.getHeroePorId(id))
    ).subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) return;

    if(this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnackbar('Registro actualizado!')
      });
      return;
    }

    this.heroesService.agregarHeroe(this.heroe).subscribe(resp => {
      this.router.navigate(['/heroes/editar', this.heroe.id]);
      this.mostrarSnackbar('Registro creado.')
    });
  }

  borrar() {
    const confirm = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      minHeight: '200px',
      data: {...this.heroe}
    });

    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe(resp => {
          this.router.navigate(['/heroes']);
        });
      }
    })

  }

  mostrarSnackbar(msg: string) {
    this.snackBar.open(msg, 'ok!', {
      duration: 2500,
    })
  }
}
