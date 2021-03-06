package tsi.ws.lucaschfonseca.introduction.api.repository

import org.springframework.data.jpa.repository.JpaRepository
import tsi.ws.lucaschfonseca.introduction.api.model.Course

interface CourseRepository : JpaRepository<Course?, Long?> {
    fun findByName(name: String?): Course?

    fun findAllByName(name: String?): List<Course?>?
}