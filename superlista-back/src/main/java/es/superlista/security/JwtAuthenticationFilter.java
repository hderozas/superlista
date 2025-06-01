package es.superlista.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro de autenticación JWT que intercepta cada solicitud HTTP para verificar el token.
 * Si el token es válido, establece la autenticación en el contexto de seguridad de Spring.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    /**
     * Constructor que inyecta los componentes necesarios.
     *
     * @param jwtUtil                 utilitario para operaciones con tokens JWT
     * @param customUserDetailsService servicio para cargar los detalles del usuario
     */
    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * Filtra cada solicitud entrante, validando el token JWT si está presente.
     *
     * @param request     la solicitud HTTP entrante
     * @param response    la respuesta HTTP saliente
     * @param filterChain la cadena de filtros
     * @throws ServletException en caso de error de servlet
     * @throws IOException      en caso de error de entrada/salida
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        logger.debug("=== Authorization header: [{}] ===" + header);
        // Extraer token de la cabecera Authorization
        String token = extractToken(request);
        if (token != null) {
            try {
                String username = jwtUtil.extractUsername(token);
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                if (jwtUtil.validateToken(token, userDetails.getUsername())) {
                    // Crea el objeto de autenticación y lo establece en el contexto
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (Exception e) {
                // Si ocurre algún error en la validación, se podría limpiar el contexto o loggear el error.
                logger.error("Error al autenticar mediante JWT: {}" + e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Función auxiliar para extraer el token JWT de la cabecera Authorization.
     *
     * @param request la solicitud HTTP entrante
     * @return el token sin el prefijo "Bearer ", o null si no está presente
     */
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
