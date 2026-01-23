package com.insurai.insurai_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class SecurityConfig {

    private final EmployeeJwtAuthenticationFilter employeeJwtAuthenticationFilter;
    private final AgentJwtAuthenticationFilter agentJwtAuthenticationFilter;
    private final HrJwtAuthenticationFilter hrJwtAuthenticationFilter;

    public SecurityConfig(EmployeeJwtAuthenticationFilter employeeJwtAuthenticationFilter,
                          AgentJwtAuthenticationFilter agentJwtAuthenticationFilter,
                          HrJwtAuthenticationFilter hrJwtAuthenticationFilter) {
        this.employeeJwtAuthenticationFilter = employeeJwtAuthenticationFilter;
        this.agentJwtAuthenticationFilter = agentJwtAuthenticationFilter;
        this.hrJwtAuthenticationFilter = hrJwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth

                // Preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // H2
                .requestMatchers("/h2-console/**").permitAll()

                // Public auth endpoints
                .requestMatchers(
                        "/auth/**",
                        "/agent/login",
                        "/agent/register",
                        "/employee/login",
                        "/employee/register",
                        "/hr/login",
                        "/admin/login",
                        "/auth/forgot-password",
                        "/auth/reset-password/**"
                ).permitAll()

                // Public resources
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/employee/policies").permitAll()

                // Secured by authority (NOT role)
                .requestMatchers("/agent/**").hasAuthority("AGENT")
                .requestMatchers("/employee/**").hasAuthority("EMPLOYEE")
                .requestMatchers("/hr/**").hasAuthority("HR")
                .requestMatchers("/admin/**").hasAuthority("ADMIN")

                .anyRequest().authenticated()
            )

            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(formLogin -> formLogin.disable());

        http.addFilterBefore(employeeJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(agentJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(hrJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Mail
    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl();
    }

    // CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173",
                                        "http://localhost:5174",
                                        "http://localhost:8080"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
