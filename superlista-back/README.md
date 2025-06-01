# 📦 superlista-back

Este es el proyecto backend de **SúperLista**, desarrollado en Java + Spring Boot.  
Se encarga de gestionar las operaciones de negocio, autenticación, seguridad, acceso a base de datos y exposición de API REST.

---

## 🚀 Cómo ejecutar

### Requisitos
✅ Java 21+    
✅ Maven 3.x  
✅ MySQL (o el motor configurado en `application.properties`)

### Pasos
```bash
mvn clean install
mvn spring-boot:run
```

La API arrancará en:
```
http://localhost:8080
```

Puedes acceder a Swagger/OpenAPI para ver y probar la documentación de la API:
```
http://localhost:8080/swagger-ui/index.html
```

---

## 🛠 Tecnologías usadas

- Java + Spring Boot
- Spring Security + JWT (autenticación y autorización)
- JPA + Hibernate (persistencia con MySQL)
- Swagger/OpenAPI (documentación de API)

---

## 📄 Documentación

La documentación técnica generada con:
- 📖 **Javadoc** (documentación de clases, métodos y estructuras Java)

Puedes consultarla localmente en:
```
./doc/index.html
```


---

## 👤 Autor

José Carlos Hernando (hderozas)  
🔗 [github.com/hderozas](https://github.com/hderozas)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
