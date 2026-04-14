import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class EmployeeSearchComponent implements OnInit {
  form: any;

  results: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
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
        // Accept multiple possible result shapes from Apollo/watchQuery
        const list = res?.data?.searchEmployeesByDesignationOrDepartment
          ?? res?.data?.searchEmployees
          ?? res?.searchEmployeesByDesignationOrDepartment
          ?? [];

        this.results = Array.isArray(list) ? list : [];

        // Clear error if we have results, otherwise try to surface server errors
        if (this.results.length > 0) {
          this.error = null;
        } else if (res && res.errors && res.errors.length) {
          this.error = res.errors.map((e: any) => e.message).join('; ');
        } else if (this.results.length === 0) {
          this.error = 'No results or unexpected server response.';
        }

        this.loading = false;
        try { this.cdr.detectChanges(); } catch (e) { /* ignore */ }
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