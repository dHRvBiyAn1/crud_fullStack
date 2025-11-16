package com.project.crudbackend.service;

import com.project.crudbackend.dtos.*;
import com.project.crudbackend.entity.Student;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface StudentService {
//    List<StudentResponse> getAllStudents();
//
//    Student getStudentById(Long id) throws RuntimeException;
//
//    CreateStudentResponse createStudent(@Valid CreateStudentRequest request);
//
//    UpdateStudentResponse updateStudent(@Valid Long id, UpdateStudentRequest request);
//
//    void deleteStudent(@Valid Long id);

    CreateStudentResponse createStudent(CreateStudentRequest dto);

    Student getStudentById(Long id);

    List<StudentResponse> getAllStudents();

    Page<StudentResponse> getStudentsWithPagination(int page, int size, String sortBy, String sortOrder);

    Page<StudentResponse> searchStudents(String searchTerm, int page, int size, String sortBy, String sortOrder);

    UpdateStudentResponse updateStudent(Long id, UpdateStudentRequest dto);

    void deleteStudent(Long id);
}
