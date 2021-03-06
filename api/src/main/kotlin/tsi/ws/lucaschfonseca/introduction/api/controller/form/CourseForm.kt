package tsi.ws.lucaschfonseca.introduction.api.controller.form

import org.hibernate.validator.constraints.Length
import tsi.ws.lucaschfonseca.introduction.api.model.Course
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

class CourseForm {
    var year = 0
    var name: @NotNull @NotEmpty @Length(min = 3) String? = null

    fun map(): Course {
        return Course(name!!, year)
    }
}