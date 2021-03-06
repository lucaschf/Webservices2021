package tsi.ws.lucaschfonseca.introduction.api.controller.form

import org.hibernate.validator.constraints.Length
import tsi.ws.lucaschfonseca.introduction.api.model.Student
import tsi.ws.lucaschfonseca.introduction.api.repository.CourseRepository
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

class StudentForm {
    var name: @NotNull @NotEmpty @Length(min = 3) String? = null
    val courseName: @NotEmpty @Length(min = 3) String? = null
    val isEnrolled = false

    fun map(repository: CourseRepository): Student {
        val course = repository.findByName(courseName)
        return Student(name!!, isEnrolled, course)
    }
}