package tsi.ws.lucaschfonseca.introduction.api.model

import java.util.*
import javax.persistence.*

@Entity
class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0

    @Column(unique = true)
    var name: String = ""
    var isEnrolled = false

    @ManyToOne
    var course: Course? = null
        private set

    constructor() {}
    constructor(name: String, enrolled: Boolean, course: Course?) {
        this.name = name
        isEnrolled = enrolled
        this.course = course
    }

    override fun equals(other: Any?): Boolean {
        if (this === other)
            return true

        if (other == null || javaClass != other.javaClass)
            return false

        val student = other as Student
        return isEnrolled == student.isEnrolled &&
                id == student.id &&
                name == student.name &&
                course == student.course
    }

    override fun hashCode(): Int {
        return Objects.hash(id, name, isEnrolled, course)
    }

    override fun toString(): String {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", enrolled=" + isEnrolled +
                ", course=" + course +
                '}'
    }
}