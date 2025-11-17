import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorResponse } from '../models/errorResponse';
import { Student, StudentRequest } from '../models/student';
import { PaginatedResponse } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/student';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  getAllStudents(): Observable<Student[]> {
    this.setLoading(true);
    return this.http.get<Student[]>(this.apiUrl).pipe(
      finalize(() => this.setLoading(false)),
      catchError(this.handleError)
    );
  }

  getStudentById(id: number): Observable<Student> {
    this.setLoading(true);
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.setLoading(false)),
      catchError(this.handleError)
    );
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
    this.setLoading(true);
    return this.http
      .get<PaginatedResponse<Student>>(`${this.apiUrl}/paginated`, { params })
      .pipe(
        finalize(() => this.setLoading(false)),
        catchError(this.handleError)
      );
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

    this.setLoading(true);
    return this.http
      .get<PaginatedResponse<Student>>(`${this.apiUrl}/search`, { params })
      .pipe(
        finalize(() => this.setLoading(false)),
        catchError(this.handleError)
      );
  }

  createStudent(student: StudentRequest): Observable<Student> {
    this.setLoading(true);
    return this.http.post<Student>(this.apiUrl, student).pipe(
      finalize(() => this.setLoading(false)),
      catchError(this.handleError)
    );
  }

  updateStudent(id: number, student: StudentRequest): Observable<Student> {
    this.setLoading(true);
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(
      finalize(() => this.setLoading(false)),
      catchError(this.handleError)
    );
  }

  deleteStudent(id: number): Observable<void> {
    this.setLoading(true);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.setLoading(false)),
      catchError(this.handleError)
    );
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
