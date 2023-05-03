package com.eblj.dsdeliveryman.config;

import com.eblj.dsdeliveryman.rest.services.impl.UserServiceImpl;
import com.eblj.dsdeliveryman.rest.services.security.JwtAutFilter;
import com.eblj.dsdeliveryman.rest.services.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Arrays;

@Configuration
public class SecurityConfig  {

    private static final String[] PUBLIC ={ "/users/auth","/products",
            "/users/save","/h2-console/**"
    };
    private static final String[] OPERATOR_OR_ADMIN ={"/users/userisauthenticated",
            "/orders/userId/**","/users/currentusername","/orders/pending","/vehicles/save,",
            "/vehicles/userId/**,"
    };
    private static final String[]  ADMIN ={"/users/**"};
    private static final String[] SWAGGER = {
            "/v2/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**",
    };
    @Autowired
    private Environment env;
    @Autowired
    private UserServiceImpl userServiceImpl;
    @Autowired
    private JwtService jwtService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OncePerRequestFilter jwtFilter(){
        return new JwtAutFilter(jwtService,userServiceImpl);
    }
    @Bean
    public UserDetailsService userDetailsService(AuthenticationManagerBuilder aut) throws Exception {
        aut
           .userDetailsService(userServiceImpl)
           .passwordEncoder(passwordEncoder());
        return aut.getDefaultUserDetailsService();

    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //H2
        if(Arrays.asList(env.getActiveProfiles()).contains("test")){
            http.headers().frameOptions().disable();
            http.authorizeRequests()
            .requestMatchers("/h2-console/**").permitAll();
        }
        http
       .authorizeRequests()
                //se não vai usar uma aplicação web, apenas rest

                .requestMatchers(SWAGGER).permitAll()
                .requestMatchers (PUBLIC).permitAll()
                .requestMatchers(HttpMethod.GET,OPERATOR_OR_ADMIN).permitAll()
                .requestMatchers(ADMIN).hasAnyRole("ADMIN","OPERATOR")
                .requestMatchers(ADMIN).hasRole("ADMIN")
                .anyRequest().authenticated()
                .and().cors()
                .and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter(){
        FilterRegistrationBean<CorsFilter> bean= new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
