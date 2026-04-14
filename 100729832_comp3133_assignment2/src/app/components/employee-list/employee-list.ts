import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  loading = true;
  debugResult: any = null;

  

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((result: any) => {
      console.log('getEmployees result:', result);
      this.debugResult = result;

      // Accept multiple possible result shapes and fallback to empty array
      const list = result?.data?.getAllEmployees ?? result?.data?.employees ?? [];
      this.employees = Array.isArray(list) ? list : [];
      console.log('employees set:', this.employees.length, this.employees);

      // ensure the UI updates even if Apollo emits outside Angular zone
      try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }

      this.loading = false;
    });
  }

  view(id: string) {
    this.router.navigate(['/employees', id]);
  }

  edit(id: string) {
    this.router.navigate(['/employees', id, 'edit']);
  }

  add() {
    this.router.navigate(['/employees/add']);
  }

  delete(id: string) {
    if (!confirm('Delete this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== id);
    });
  }
}