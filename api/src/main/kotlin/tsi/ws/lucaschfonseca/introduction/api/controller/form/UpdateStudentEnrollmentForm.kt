package tsi.ws.lucaschfonseca.introduction.api.controller.form

import tsi.ws.lucaschfonseca.introduction.api.model.Student
import tsi.ws.lucaschfonseca.introduction.api.repository.StudentRepository

class UpdateStudentEnrollmentForm {
    var isEnrolled = false

    fun update(id: Long, studentRepository: StudentRepository): Student {
        val student = studentRepository.getOne(id)
        student.isEnrolled = isEnrolled
        return student
    }
}