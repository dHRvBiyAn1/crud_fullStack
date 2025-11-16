import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../models/errorResponse';
import { Student, StudentRequest } from '../models/student';
import { PaginatedResponse } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/student';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getStudentById(id: number): Observable<Student> {
    return this.http
      .get<Student>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getStudentsWithPagination(
    page: number,
    size: number,
    sortBy: string = 'createdAt',
    sortOrder: string = 'desc'
  ): Observable<PaginatedResponse<Student>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http
      .get<PaginatedResponse<Student>>(`${this.apiUrl}/paginated`, { params })
      .pipe(catchError(this.handleError));
  }

  searchStudents(
    searchTerm: string,
    page: number,
    size: number,
    sortBy: string = 'createdAt',
    sortOrder: string = 'desc'
  ): Observable<PaginatedResponse<Student>> {
    let params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http
      .get<PaginatedResponse<Student>>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  createStudent(student: StudentRequest): Observable<Student> {
    return this.http
      .post<Student>(this.apiUrl, student)
      .pipe(catchError(this.handleError));
  }

  updateStudent(id: number, student: StudentRequest): Observable<Student> {
    return this.http
      .put<Student>(`${this.apiUrl}/${id}`, student)
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      const apiError = error.error as ErrorResponse;
      errorMessage = apiError.message || errorMessage;
    }
    return throwError(() => error.error);
  }
}
