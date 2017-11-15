package <%=fullCommonServiceReferer%>.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * 如下方式可以轻松实现开发与生产环境的隔离
 *
 * 并不推荐将目标host直接写为本地host来进行测试
 * 推荐使用postman测试生产者
 * 使用mock测试消费者(将目标名字解析到Mock server上)
 *
 * 进行持续集成的测试推荐也是如此
 * 生产者通过起restTemplate测试
 * 消费者通过连接到mock server测试
 *
 */
@Configuration
public class RefererConfig {

    /**
     * 如今版本的spring mvc上下文中并不是直接就有restTemplate
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

//    @Bean
//    public FastJsonProvider fastJsonProvider() {
//        return new FastJsonProvider();
//    }

//    private String localSvcHost = "localhost:8080";
//    private String prodSvcHost = "<%=projectName%>";

//    @Bean
//    @Profile("local")
//    public TtJaxrsProxy getLocalTtJaxrsProxy() {
//        return new TtJaxrsProxy(localSvcHost);
//    }
//
//    @Bean
//    @Profile("prod")
//    public TtJaxrsProxy getProdTtJaxrsProxy() {
//        return new TtJaxrsProxy(prodSvcHost);
//    }

}
