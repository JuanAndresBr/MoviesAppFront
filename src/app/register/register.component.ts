import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../Services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formularioRegistro: FormGroup;

  constructor(
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formularioRegistro = this.fb.group({
      nam: ['', Validators.required],
      username: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  registrarUsuario() {
    if (this.formularioRegistro.valid) {
      const request = {
        id: 0,
        nam: this.formularioRegistro.value.nam,
        username: this.formularioRegistro.value.username,
        pass: this.formularioRegistro.value.pass,
      };

      this.usuarioServicio.addUser(request).subscribe({
        next: (data) => {
          // Maneja la respuesta del servidor si es necesario
          this.formularioRegistro.reset();
          alert(request.nam + ' ha quedado registrado');
          this.router.navigate(['/']);
        },
        error: (e) => {
          // Maneja los errores si es necesario
          console.error('Error al registrar usuario:', e);
        },
      });
    }
  }
}
