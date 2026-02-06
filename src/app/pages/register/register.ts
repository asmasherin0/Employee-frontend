// import { Component, inject } from '@angular/core';
// import { Auth } from '../../core/services/auth';
// import { Router, RouterLink } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   imports: [FormsModule,RouterLink],
//   templateUrl: './register.html',
//   styleUrl: './register.css',
// })
// export class Register {
//   private auth = inject(Auth);
//   private router = inject(Router);

//   data = {
//     username: '',
//     email: '',
//     password: ''
//   };

// register() {
//   this.auth.register(this.data).subscribe({
//     next: () => {
//       alert('Registration successful');
//       this.router.navigate(['/login']);
//     },
//     error: (err) => {
//       console.log(err);   // 👈 see real error
//       alert('Registration failed');
//     }
//   });
// }}


import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.register(this.form.value).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert('Registration failed');
      }
    });
  }
}
