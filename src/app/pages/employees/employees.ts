import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee';
import { EmployeeData } from '../../models/employee';

@Component({
  selector: 'app-employees',
  imports: [ReactiveFormsModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class Employees implements OnInit {
  private empService = inject(EmployeeService);
  private fb = inject(FormBuilder);
  private cd = inject(ChangeDetectorRef);   // 👈 add this

  employees: EmployeeData[] = [];
  editingId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    salary: ['', Validators.required]
  });

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.list().subscribe({
      next: (res: any) => {
        this.employees = [...res];   // 👈 new reference
        this.cd.detectChanges();     // 👈 force refresh
      },
      error: (err) => console.log(err)
    });
  }

  submit() {
    if (this.form.invalid) return;

    if (this.editingId) {
      this.empService.update(this.editingId, this.form.value).subscribe(() => {
        this.reset();
        this.loadEmployees();
      });
    } else {
      this.empService.create(this.form.value).subscribe(() => {
        this.reset();
        this.loadEmployees();
      });
    }
  }

  edit(emp: any) {
    this.editingId = emp.id;
    this.form.patchValue(emp);
  }

  delete(id: number) {
    this.empService.delete(id).subscribe(() => this.loadEmployees());
  }

  reset() {
    this.editingId = null;
    this.form.reset();
  }
}
