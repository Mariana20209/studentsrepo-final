package com.grupo7.studentsrepo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI studentsRepoOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("StudentsRepo API")
                        .description("""
                                API REST para gestión de documentos académicos.
                                
                                Permite administrar **Estudiantes**, **Admins** y **Documentos** con:
                                - Herencia JPA (@MappedSuperclass)
                                - Composición (@Embeddable / @Embedded)
                                - Enumeraciones (@Enumerated)
                                - Auditoría automática (@CreatedDate / @LastModifiedDate)
                                - DTOs y Mappers
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Grupo 7")
                                .email("grupo7@universidad.edu"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}