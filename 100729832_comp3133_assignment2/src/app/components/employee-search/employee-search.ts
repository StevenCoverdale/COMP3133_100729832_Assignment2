import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-search.html',
  styleUrls: ['./employee-search.scss']
})
export class EmployeeSearchComponent {
  form: any;

  results: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      designation: [''],
      department: ['']
    });
  }

  search() {
    const { designation, department } = this.form.value;

    this.loading = true;

    this.employeeService.searchEmployees(designation!, department!).subscribe({
      next: (res: any) => {
        // Guard against unexpected shapes (network errors or validation errors)
        if (res && res.data && res.data.searchEmployeesByDesignationOrDepartment) {
          this.results = res.data.searchEmployeesByDesignationOrDepartment;
          this.error = null;
        } else {
          this.results = [];
          // try to extract server-side validation errors
          if (res && res.errors && res.errors.length) {
            this.error = res.errors.map((e: any) => e.message).join('; ');
          } else {
            this.error = 'No results or unexpected server response.';
          }
        }

        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        this.results = [];
        this.error = 'Search failed. ' + (err.message || 'Server error');
        console.error('Search error', err);
      }
    });
  }
}