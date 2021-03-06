package tsi.ws.lucaschfonseca.introduction.api.config.validation

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.MessageSource
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.http.HttpStatus
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.util.*
import java.util.function.Consumer

@RestControllerAdvice
class ValidationErrorHandler {
    @Autowired
    var messageSource: MessageSource? = null

    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handle(exception: MethodArgumentNotValidException): List<FormErrorDto> {
        val errors: MutableList<FormErrorDto> = ArrayList()
        exception.bindingResult.fieldErrors.forEach(Consumer { e: FieldError ->
            val message = messageSource!!.getMessage(e, LocaleContextHolder.getLocale())
            errors.add(FormErrorDto(e.field, message))
        })

        return errors
    }
}