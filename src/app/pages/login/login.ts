// import { Component, inject } from '@angular/core';
// import { Auth } from '../../core/services/auth';
// import { Router, RouterLink } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule,RouterLink],
//   templateUrl: './login.html',
//   styleUrl: './login.css',
// })
// export class Login {
//   private auth=inject(Auth);
//   private router=inject(Router);

//   data={
//     username:'',
//     password:''
//   };

//   login(){
//     this.auth.login(this.data).subscribe({
//       next:(res:any)=> {
//         this.auth.saveToken(res.access);
//         alert('Login successful');
//         this.router.navigate(['/employees']);
//       },
//       error:() => alert('Invalid username or password')
//     });
//   }

// }

//reactiveforms

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.access);
        this.router.navigate(['/employees']);
      },
      error: () => alert('Invalid username or password')
    });
  }
}

