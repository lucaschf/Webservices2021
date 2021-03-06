package tsi.ws.lucaschfonseca.introduction.api.config.security

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@Configuration
@EnableWebSecurity
class SecurityConfigurations : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/students").permitAll()
                .antMatchers(HttpMethod.GET, "/courses").permitAll()
                .antMatchers(HttpMethod.GET, "/students/*").permitAll()
                .antMatchers(HttpMethod.GET, "/courses/*").permitAll()
                .and().csrf().disable()
    }

    override fun configure(web: WebSecurity) {
        web.ignoring().antMatchers("/**.html",
                "/v2/api-docs",
                "/webjars/**",
                "/configuration/**",
                "/swagger-resources/**")
    }
}