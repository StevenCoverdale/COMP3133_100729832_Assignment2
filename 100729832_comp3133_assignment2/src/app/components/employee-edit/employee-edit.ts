import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.scss'
})
export class EmployeeEditComponent implements OnInit {

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: [''],
    gender: [''],
    designation: ['', Validators.required],
    salary: [0, Validators.required],
    date_of_joining: ['', Validators.required],
    department: ['', Validators.required],
    employee_photo: ['']
  });

  eid!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eid = this.route.snapshot.paramMap.get('id')!;

    this.employeeService.getEmployee(this.eid).subscribe((result: any) => {
      const emp = result.data.getEmployeeById;
      this.form.patchValue(emp);
    });
  }

  onFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.form.patchValue({ employee_photo: reader.result });
    };

    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) return;

    this.employeeService.updateEmployee(this.eid, this.form.value).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}