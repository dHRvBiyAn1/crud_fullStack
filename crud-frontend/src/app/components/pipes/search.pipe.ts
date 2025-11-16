import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../models/student';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(students: Student[], searchTerm: string): Student[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return students;
    }

    const term = searchTerm.toLowerCase().trim();

    return students.filter(student =>
      student.firstName.toLowerCase().includes(term) ||
      student.lastName.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.username.toLowerCase().includes(term)
    );
  }
}
