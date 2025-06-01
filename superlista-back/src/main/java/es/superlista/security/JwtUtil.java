package es.superlista.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;


/**
 * Utilitario para la gestión de tokens JWT.
 * Permite generar, validar y extraer información de los tokens para autenticación.
 */
@Component
public class JwtUtil {

    /**
     * Clave secreta para firmar el token.
     * ⚠ En producción, esta clave debe almacenarse de forma segura (no hardcodeada).
     */
    private final String SECRET_KEY = "mi_clave_secreta_super_segura";

    /**
     * Tiempo de expiración del token en milisegundos (actualmente: 10 horas).
     */
    private final long EXPIRATION_TIME = 10 * 60 * 60 * 1000;

    /**
     * Genera un token JWT a partir del nombre de usuario.
     *
     * @param username nombre de usuario para incluir como sujeto (subject) del token
     * @return token JWT generado
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    /**
     * Extrae el nombre de usuario (subject) del token.
     *
     * @param token token JWT
     * @return nombre de usuario contenido en el token
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Valida un token comprobando su integridad y que no haya expirado.
     *
     * @param token    token JWT a validar
     * @param username nombre de usuario esperado
     * @return true si el token es válido, false en caso contrario
     */
    public boolean validateToken(String token, String username) {
        String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }


    /**
     * Comprueba si el token ha expirado.
     *
     * @param token token JWT
     * @return true si el token está expirado, false si aún es válido
     */
    private boolean isTokenExpired(String token) {
        final Date expiration = extractClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    /**
     * Extrae todos los claims (información) del token.
     *
     * @param token token JWT
     * @return objeto {@link Claims} con los datos extraídos
     */
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
