# 🛒 SúperLista

Bienvenido al proyecto **SúperLista**, una aplicación web para organizar tus menús semanales, gestionar recetas, ingredientes y generar listas de la compra.

Este repositorio contiene **dos proyectos en uno**:
- 📦 **superlista-back** → Backend desarrollado en Java + Spring Boot
- 💻 **superlista-front** → Frontend desarrollado en Angular

---

## 📂 Estructura del repositorio

```
/superlista  
├── superlista-back/      # Proyecto backend (API REST, JPA, Spring Security, JWT)  
├── superlista-front/     # Proyecto frontend (Angular, Material, Formly)  
├── .gitignore  
├── LICENSE  
└── README.md             # Este archivo  
```

---

## 🚀 Cómo ejecutar el backend

### Requisitos
✅ Java 21+   
✅ Maven 3.x  
✅ MySQL (o el motor configurado en `application.properties`)

### Pasos
```bash
cd superlista-back
mvn clean install
mvn spring-boot:run
```

La API arrancará en:
```
http://localhost:8080
```

Puedes acceder a Swagger/OpenAPI en:
```
http://localhost:8080/swagger-ui/index.html
```

---

## 🌐 Cómo ejecutar el frontend

### Requisitos
✅ Node.js + npm  
✅ Angular CLI

### Pasos
```bash
cd superlista-front
npm install
ng serve
```

La aplicación estará disponible en:
```
http://localhost:4200
```

---

## 🗂 Documentación

- 🔧 **Compodoc (frontend)** → Genera documentación Angular
- 📖 **Javadoc (backend)** → Genera documentación del código Java

Las carpetas generadas (`documentation/` y `javadoc/`) pueden subirse aparte o incluirse como releases si lo deseas.

---

## 🛠 Tecnologías usadas

### Backend
- Java + Spring Boot
- Spring Security + JWT
- JPA + Hibernate
- MySQL
- Swagger/OpenAPI

### Frontend
- Angular 19
- Angular Material
- Formly
- Bootstrap (estilo pastel moderno)
- html2pdf / jsPDF (para exportar listas y menús)

---

## 👤 Autor

José Carlos Hernando (hderozas)  
🔗 [github.com/hderozas](https://github.com/hderozas)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
