package tsi.ws.lucaschfonseca.introduction.api.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.util.UriComponentsBuilder
import tsi.ws.lucaschfonseca.introduction.api.controller.dto.CourseDto
import tsi.ws.lucaschfonseca.introduction.api.controller.form.CourseForm
import tsi.ws.lucaschfonseca.introduction.api.model.Course
import tsi.ws.lucaschfonseca.introduction.api.repository.CourseRepository
import javax.validation.Valid

@RestController
@RequestMapping("/courses")
class CourseController {
    @Autowired
    private val courseRepository: CourseRepository? = null

    @PostMapping
    fun insert(@RequestBody form: @Valid CourseForm?, uriComponentsBuilder: UriComponentsBuilder): ResponseEntity<CourseDto> {
        form!!.map().let { course ->
            courseRepository!!.save(course)
            val uri = uriComponentsBuilder.path("/course/{id}").buildAndExpand(course.id).toUri()
            return ResponseEntity.created(uri).body(CourseDto(course))
        }
    }

    @GetMapping
    fun fetch(name: String?): List<CourseDto> {
        return when {
            name == null || name.trim { it <= ' ' }.isEmpty() -> CourseDto.map(courseRepository!!.findAll())
            else -> CourseDto.map(courseRepository!!.findAllByName(name) as MutableList<Course?>)
        }
    }

    @GetMapping("/{id}")
    fun fetchById(@PathVariable id: Long): ResponseEntity<CourseDto> {
        with(courseRepository!!.findById(id)) {
            return this.map { course: Course? -> ResponseEntity.ok(CourseDto(course!!)) }
                    .orElseGet { ResponseEntity.notFound().build() }
        }
    }
}