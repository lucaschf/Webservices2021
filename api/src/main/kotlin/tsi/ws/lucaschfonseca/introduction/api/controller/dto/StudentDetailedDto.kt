package tsi.ws.lucaschfonseca.introduction.api.controller.dto

import tsi.ws.lucaschfonseca.introduction.api.model.Student

class StudentDetailedDto(student: Student) {
    val id: Long
    val name: String
    val isEnrolled: Boolean
    val courseName: String

    init {
        id = student.id
        name = student.name
        isEnrolled = student.isEnrolled
        courseName = student.course!!.name
    }

    override fun toString(): String {
        return "StudentDetailedDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", enrolled=" + isEnrolled +
                ", courseName='" + courseName + '\'' +
                '}'
    }
}