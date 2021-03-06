package tsi.ws.lucaschfonseca.introduction.api.controller.dto

import tsi.ws.lucaschfonseca.introduction.api.controller.dto.StudentDto.Companion.map
import tsi.ws.lucaschfonseca.introduction.api.model.Course
import java.util.stream.Collectors

class CourseDto(course: Course) {
    val id: Long
    val year: Int
    val name: String
    val students: List<StudentDto>

    init {
        id = course.id
        year = course.year
        name = course.name
        students = map(course.students)
    }

    override fun toString(): String {
        return "CourseDto{" +
                "id=" + id +
                ", year=" + year +
                ", name='" + name + '\'' +
                ", students=" + students +
                '}'
    }

    companion object {
        fun map(courses: MutableList<Course>): List<CourseDto> {
            return courses.stream().map { course: Course -> CourseDto(course) }.collect(Collectors.toList())
        }
    }
}