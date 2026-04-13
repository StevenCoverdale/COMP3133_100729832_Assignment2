import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.html',
  styleUrls: ['./employee-add.scss']
})
export class EmployeeAddComponent {
  form: any;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [''],
      gender: [''],
      designation: ['', Validators.required],
      salary: [null, Validators.required],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['']
    });
  }

  onFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.form.patchValue({ employee_photo: String(reader.result) });
    };

    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) return;

    this.employeeService.createEmployee(this.form.value).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}