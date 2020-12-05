import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Maria',
    apellido: 'Lopez',
    email: 'mlopez@extrasoft.es',
    pais: 'ESP',
    genero: 'F',
  };

  paises: Pais[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe({
      next: (paises) => {
        this.paises = paises;
        this.paises.unshift(new Pais('[ Seleccione país ]', ''));
        // console.log(this.paises);
      },
    });
  }

  guardar(formulario: NgForm): void {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach((control) =>
        control.markAllAsTouched()
      );
      return;
    }
    // console.log('submit disparado');
    // console.log(formulario.value);
  }
}
