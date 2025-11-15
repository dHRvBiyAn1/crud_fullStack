import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../models/errorResponse';
import { StudentService } from '../../service/student.service';
import { StudentRequest } from '../../models/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentForm {
  student: StudentRequest = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  };

  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage: string = '';
  fieldErrors: { [key: string]: string } = {};

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordsMatch(): boolean {
    return this.student.password === this.confirmPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.fieldErrors = {};

    if (!this.passwordsMatch()) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.studentService.createStudent(this.student).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: ErrorResponse) => {
        this.errorMessage = error.message || 'Failed to create student';
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
