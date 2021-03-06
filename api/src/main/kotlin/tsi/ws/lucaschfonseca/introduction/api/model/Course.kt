package tsi.ws.lucaschfonseca.introduction.api.model

import java.util.*
import javax.persistence.*

@Entity
class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
    var year = 0
        private set

    @Column(unique = true)
    var name: String = ""

    @OneToMany(mappedBy = "course")
    val students: List<Student> = ArrayList()

    constructor()
    constructor(name: String, year: Int) {
        this.name = name
        this.year = year
    }

    override fun equals(other: Any?): Boolean {
        if (this === other)
            return true

        if (other == null || javaClass != other.javaClass)
            return false

        val course = other as Course
        return year == course.year &&
                id == course.id &&
                name == course.name &&
                students == course.students
    }

    override fun hashCode(): Int {
        return Objects.hash(id, year, name, students)
    }

    override fun toString(): String {
        return "Course{" +
                "id=" + id +
                ", year=" + year +
                ", name='" + name + '\'' +
                ", students=" + students +
                '}'
    }
}