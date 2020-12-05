import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [],
})
export class ReactiveComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDatosIniciales();
    this.crearListeners();
  }

  ngOnInit(): void {}

  guardar(): void {
    console.log(this.formulario);

    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }

    // TODO: Posteo de la información

    this.formulario.reset({
      nombre: 'Sin nombre',
    });
  }

  // get nombreNoValido(): boolean {
  //   return (
  //     this.formulario.get('nombre').invalid &&
  //     this.formulario.get('nombre').touched
  //   );
  // }

  // get apellidoNoValido(): boolean {
  //   return (
  //     this.formulario.get('apellido').invalid &&
  //     this.formulario.get('apellido').touched
  //   );
  // }

  // get correoNoValido(): boolean {
  //   return (
  //     this.formulario.get('correo').invalid &&
  //     this.formulario.get('correo').touched
  //   );
  // }

  get pasatiempos(): FormArray {
    return this.formulario.get('pasatiempos') as FormArray;
  }

  agregarPasatiempo(): void {
    this.pasatiempos.push(this.formBuilder.control('', Validators.required));
  }

  borrarPasatiempo(index: number): void {
    this.pasatiempos.removeAt(index);
  }

  campoNoValido(campo: string): boolean {
    return (
      this.formulario.get(campo).invalid && this.formulario.get(campo).touched
    );
  }

  get pass2NoValido(): boolean {
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;

    return this.campoNoValido('pass2') || !(pass1 === pass2);
  }

  get usuarioNoValido(): boolean {
    return this.campoNoValido('usuario');
  }

  noHerrera(): boolean {
    return this.formulario.get('apellido').errors?.noHerrera != null;
  }

  private crearFormulario(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this.validadores.noHerrera]],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.formBuilder.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.formBuilder.array([]),
      },
      {
        validators: [this.validadores.passwordsIguales('pass1', 'pass2')],
      }
    );
  }

  private crearListeners(): void {
    // cualquier valor del formulario
    // this.formulario.valueChanges.subscribe((valor) => {
    //   console.log(valor);
    // });

    // Cualquier cambio en el status
    // this.formulario.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });

    this.formulario.get('nombre').valueChanges.subscribe((valor) => {
      console.log(valor);
    });
  }

  private cargarDatosIniciales(): void {
    // this.formulario.setValue({
    this.formulario.reset({
      nombre: 'Maria',
      apellido: 'Lopez',
      correo: 'mlopez@extrasoft.es',
      pass1: '123',
      pass2: '123',
      usuario: '',
      direccion: {
        distrito: 'Latina',
        ciudad: 'Madrid',
      },
    });

    ['comer', 'dormir'].forEach((pasatiempo) =>
      this.pasatiempos.push(this.formBuilder.control(pasatiempo))
    );
  }
}
