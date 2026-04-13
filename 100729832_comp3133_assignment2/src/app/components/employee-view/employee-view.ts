import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-view.html',
  styleUrl: './employee-view.scss'
})
export class EmployeeViewComponent implements OnInit {

  employee: any = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const eid = this.route.snapshot.paramMap.get('id')!;

    this.employeeService.getEmployee(eid).subscribe((result: any) => {
      this.employee = result.data.getEmployeeById;
    });
  }
}