package com.project.crudbackend.service;

import com.project.crudbackend.dtos.*;
import com.project.crudbackend.entity.Student;
import com.project.crudbackend.exception.EmailAlreadyExistsException;
import com.project.crudbackend.exception.StudentNotFoundException;
import com.project.crudbackend.exception.UsernameAlreadyExistsException;
import com.project.crudbackend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // --- Service methods ----------------------------------------------------

    @Override
    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::toStudentResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with ID " + id + " not found"));
    }

    @Override
    public CreateStudentResponse createStudent(CreateStudentRequest request) {
        if (studentRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }

        if (studentRepository.findByEmail(request.getEmail()).isPresent()) { // fixed
            throw new EmailAlreadyExistsException("Email already exists");
        }

        Student student = Student.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .build();

        Student savedStudent = studentRepository.save(student);

        return toCreateResponse(savedStudent);
    }

    @Override
    public UpdateStudentResponse updateStudent(Long id, UpdateStudentRequest request) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with ID " + id + " not found"));

        existingStudent.setFirstName(request.getFirstName());
        existingStudent.setLastName(request.getLastName());
        existingStudent.setEmail(request.getEmail());
        existingStudent.setUsername(request.getUsername());

        Student updatedStudent = studentRepository.save(existingStudent);

        return toUpdateResponse(updatedStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException("Student with ID " + id + " not found");
        }
        studentRepository.deleteById(id);
    }
    // --- Helpers ------------------------------------------------------------

    private StudentResponse toStudentResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .username(student.getUsername())
                .email(student.getEmail())
                .createdAt(student.getCreatedAt().toString())
                .updatedAt(student.getUpdatedAt().toString())
                .build();
    }

    private CreateStudentResponse toCreateResponse(Student student) {
        return CreateStudentResponse.builder()
                .username(student.getUsername())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .build();
    }

    private UpdateStudentResponse toUpdateResponse(Student student) {
        return UpdateStudentResponse.builder()
                .username(student.getUsername())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .createdAt(student.getCreatedAt().toString())
                .updatedAt(student.getUpdatedAt().toString())
                .build();
    }
}
