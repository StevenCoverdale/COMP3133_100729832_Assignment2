import { Component, OnInit } from '@angular/core';
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

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((result: any) => {
      this.employees = result.data.getAllEmployees;
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