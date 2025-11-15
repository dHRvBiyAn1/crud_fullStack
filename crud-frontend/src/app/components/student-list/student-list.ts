import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../service/student.service';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentList implements OnInit {
  students: Student[] = [];
  errorMessage: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load students';
      }
    });
  }

  deleteStudent(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to delete student';
        }
      });
    }
  }

  editStudent(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/edit', id]);
    }
  }

  addStudent(): void {
    this.router.navigate(['/add']);
  }
}
