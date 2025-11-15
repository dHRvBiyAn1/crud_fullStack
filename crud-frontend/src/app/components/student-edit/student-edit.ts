import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorResponse } from '../../models/errorResponse';
import { StudentRequest } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-edit.html',
  styleUrls: ['./student-edit.css'],
})
export class StudentEdit {
  studentId!: number;
  student: StudentRequest = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  };

  displayPassword: string = '';
  errorMessage: string = '';
  fieldErrors: { [key: string]: string } = {};

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent();
  }

  loadStudent(): void {
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.student = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          username: data.username,
          password: '' // Don't send password in update
        };
        // Display masked password (assuming password length of 8-12 characters)
        this.displayPassword = '**********';
      },
      error: (error) => {
        this.errorMessage = 'Failed to load student';
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.fieldErrors = {};

    this.studentService.updateStudent(this.studentId, this.student).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: ErrorResponse) => {
        this.errorMessage = error.message || 'Failed to update student';
        if (error.fieldErrors) {
          this.fieldErrors = error.fieldErrors;
        }
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
