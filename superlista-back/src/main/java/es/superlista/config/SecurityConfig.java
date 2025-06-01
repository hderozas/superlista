package es.superlista.config;

import es.superlista.security.CustomUserDetailsService;
import es.superlista.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

/**
 * Clase de configuración de seguridad para la aplicación SúperLista.
 * Configura los filtros, las políticas de sesión, las reglas de autorización y el manejo de CORS.
 */
@Configuration
public class SecurityConfig {
    /**
     * Filtro para manejar la autenticación basada en JWT.
     */
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    /**
     * Servicio personalizado para cargar los detalles del usuario durante la autenticación.
     */
    private final CustomUserDetailsService userDetailsService;

    /**
     * Constructor de la clase SecurityConfig.
     *
     * @param jwtAuthenticationFilter el filtro JWT para autenticación
     * @param userDetailsService      el servicio personalizado de detalles de usuario
     */
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          CustomUserDetailsService userDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Configura la cadena de filtros de seguridad, incluyendo reglas de autorización,
     * manejo de sesión, CSRF, CORS y la inserción del filtro JWT.
     *
     * @param http objeto HttpSecurity para configurar las reglas
     * @return la cadena de filtros de seguridad configurada
     * @throws Exception en caso de error durante la configuración
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/auth/login", "/usuarios/nuevo", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .anyRequest().authenticated()
                )
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:4200")); // 👈 frontend
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }));

        http.addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Provee el AuthenticationManager para manejar autenticaciones.
     *
     * @param configuration la configuración de autenticación
     * @return el administrador de autenticación
     * @throws Exception en caso de error al obtenerlo
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Provee el PasswordEncoder para codificar contraseñas.
     *
     * @return el codificador de contraseñas basado en BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
