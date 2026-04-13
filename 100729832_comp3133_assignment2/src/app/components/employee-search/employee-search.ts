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

    this.employeeService.searchEmployees(designation!, department!).subscribe((res: any) => {
      this.results = res.data.searchEmployeesByDesignationOrDepartment;
      this.loading = false;
    });
  }
}