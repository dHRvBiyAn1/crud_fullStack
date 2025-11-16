package com.project.crudbackend.repository;

import com.project.crudbackend.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<Student> findByEmail(String email);
    Optional<Student> findByUsername(String username);

    // Filtering methods
    @Query("SELECT s FROM Student s WHERE " +
            "LOWER(s.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(s.username) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Student> searchStudents(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Get all with pagination and sorting
    Page<Student> findAll(Pageable pageable);
}
