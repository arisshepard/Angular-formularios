import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  // campoNoValido(control: FormControl): { [s: string]: boolean } {
  //   console.log(
  //     'Validacion: ' + control.invalid && control.touched
  //       ? { campoNoValido: true }
  //       : null
  //   );

  //   // return control.invalid && control.touched ? { campoNoValido: true } : null;
  // }

  existeUsuario(
    control: FormControl
  ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

  noHerrera(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true,
      };
    } else {
      return null;
    }
  }

  // debe retornar una función
  passwordsIguales(
    pass1Name: string,
    pass2Name: string
  ): (arg0: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
