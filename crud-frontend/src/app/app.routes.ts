import { Routes } from '@angular/router';
import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';
import { StudentEdit } from './components/student-edit/student-edit';

export const routes: Routes = [
    { path: '', component: StudentList },
  { path: 'add', component: StudentForm },
  { path: 'edit/:id', component: StudentEdit },
  { path: '**', redirectTo: '' }
];
