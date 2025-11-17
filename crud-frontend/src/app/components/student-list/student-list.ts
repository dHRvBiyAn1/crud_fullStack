import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../service/student.service';
import { PaginatedResponse, SortOption } from '../../models/pagination.model';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css'],
  providers: [SearchPipe]
})
export class StudentList implements OnInit {
  allStudents: Student[] = [];
  displayedStudents: Student[] = [];
  errorMessage: string = '';
  

  // Pagination
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  isLastPage: boolean = false;
  isFirstPage: boolean = true;
  
  // Search - Real-time with pipe
  searchTerm: string = '';
  
  // Sorting
  sortBy: string = 'createdAt';
  sortOrder: string = 'desc';
  sortableFields = ['createdAt', 'updatedAt', 'firstName', 'lastName', 'email', 'username'];
  isLoading$: any;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private searchPipe: SearchPipe,
    private toastr: ToastrService
  ) {
    this.isLoading$ = this.studentService.loading$;
  }

  
  ngOnInit(): void {
    this.loadStudents();
  }
  
  loadStudents(): void {
    this.getStudentsWithPagination();
  }

  getStudentsWithPagination(): void {
    this.studentService.getStudentsWithPagination(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortOrder
    ).subscribe({
      next: (data: PaginatedResponse<Student>) => {
        this.allStudents = data.content;
        this.updateDisplayedStudents();
        this.currentPage = data.pageNumber;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.isLastPage = data.isLastPage;
        this.isFirstPage = data.isFirstPage;
        this.errorMessage = '';
      },
      error: (error) => {
        this.toastr.error(error.message || 'Failed to load students', 'Error');
      }
    });
  }

  updateDisplayedStudents(): void {
    this.displayedStudents = this.searchPipe.transform(this.allStudents, this.searchTerm);
  }

  onSearchChange(): void {
    this.currentPage = 0;
    this.updateDisplayedStudents();
  }

  onHeaderClick(field: string): void {
    if (this.sortableFields.includes(field)) {
      if (this.sortBy === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = field;
        this.sortOrder = 'desc';
      }
      this.currentPage = 0;
      this.loadStudents();
    }
  }

  getSortIndicator(field: string): string {
    if (this.sortBy !== field) return '';
    return this.sortOrder === 'asc' ? ' ▲' : ' ▼';
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadStudents();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadStudents();
    }
  }

  deleteStudent(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.toastr.success('Student deleted successfully', 'Success');
          this.loadStudents();
        },
        error: (error) => {
          this.toastr.error(error.message || 'Failed to delete student', 'Error');
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

   getStartIndex(): number {
    return this.currentPage * this.pageSize + 1;
  }

  getEndIndex(): number {
    const endIndex = (this.currentPage + 1) * this.pageSize;
    return Math.min(endIndex, this.getTotalDisplayed());
  }

  getTotalDisplayed(): number {
    return this.displayedStudents.length;
  }
}
