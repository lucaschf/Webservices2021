package tsi.ws.lucaschfonseca.introduction.api.repository

import org.springframework.data.jpa.repository.JpaRepository
import tsi.ws.lucaschfonseca.introduction.api.model.Student

interface StudentRepository : JpaRepository<Student?, Long?> {
    fun findByName(name: String?): List<Student?>?
}