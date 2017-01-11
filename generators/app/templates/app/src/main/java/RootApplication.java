package <%=fullApp%>;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.net.InetAddress;

/**
 * 系统启动类
 * Created by Slahser on 8/16/16 11:43 
 */
@Slf4j
@SpringBootApplication
public class RootApplication {

    /**
     * @param args
     */
    public static void main(String[] args) throws Exception {
        SpringApplication app = new SpringApplication(RootConfig.class);
        //ApplicationContext ctx = app.run(args);
        Environment env = app.run(args).getEnvironment();
        log.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running! Access URLs:\n\t" +
                "Local: \t\thttp://127.0.0.1:{}\n\t" +
                "External: \thttp://{}:{}\n\t" +
                "Swagger API:http://127.0.0.1:{}/swagger-ui.html\n" +
                "----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            env.getProperty("server.port"),
            InetAddress.getLocalHost().getHostAddress(),
            env.getProperty("server.port"),
            env.getProperty("server.port"));
    }

}
