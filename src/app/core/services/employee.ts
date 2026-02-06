import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EmployeeData } from '../../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<EmployeeData[]>(`${environment.apiUrl}/employee/`);
  }

  create(data: any) {
    return this.http.post<EmployeeData>(`${environment.apiUrl}/employee/`, data);
  }

  update(id: number, data: any) {
    return this.http.put<EmployeeData>(`${environment.apiUrl}/employee/${id}/`, data);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/employee/${id}/`);
  }
}
