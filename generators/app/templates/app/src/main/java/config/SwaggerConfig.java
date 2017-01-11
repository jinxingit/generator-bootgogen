package <%=fullApp%>.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.collect.Lists.newArrayList;

/**
 * Created by Slahser on 8/21/16 23:58 
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.basePackage("<%=fullApp%>.controller"))
            .paths(PathSelectors.any())
            .build()
            .securitySchemes(newArrayList(apiKey()));
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("<%=projectName%>项目API文档")
            .description("来自<%=projectName%>")
            .termsOfServiceUrl("http://localhost:8080/")
            .version("1.0")
            .build();
    }

    private ApiKey apiKey() {
        return new ApiKey("Authorization", "api_key", "header");
    }


    @Bean
    SecurityConfiguration security() {
        return new SecurityConfiguration((String) null, (String) null, (String) null, (String) null, (String) null, ApiKeyVehicle.HEADER, "Authorization", ",");
    }

}
