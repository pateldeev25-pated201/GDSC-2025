package com.dylanmkdr.gdsc2025.binks.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()  // Public endpoints
                .anyRequest().authenticated()  // Secure all other requests
            )
            .formLogin(form -> form.defaultSuccessUrl("/home", true))  // Enable login
            .logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/public/login")); // Enable logout
        
        return http.build();
    }
}
