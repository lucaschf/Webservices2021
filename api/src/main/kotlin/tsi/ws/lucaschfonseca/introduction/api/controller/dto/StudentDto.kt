package tsi.ws.lucaschfonseca.introduction.api.controller.dto

import tsi.ws.lucaschfonseca.introduction.api.model.Student
import java.util.stream.Collectors

class StudentDto(student: Student) {
    val id: Long
    val name: String
    val isEnrolled: Boolean

    init {
        id = student.id
        name = student.name
        isEnrolled = student.isEnrolled
    }

    override fun toString(): String {
        return "StudentDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", enrolled=" + isEnrolled +
                '}'
    }

    companion object {
        @JvmStatic
        fun map(students: List<Student>): List<StudentDto> {
            return students.stream().map { student: Student -> StudentDto(student) }.collect(Collectors.toList())
        }
    }
}