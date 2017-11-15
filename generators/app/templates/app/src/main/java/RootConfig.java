package <%=fullApp%>;

import <%=fullApp%>.config.MvcConfig;
import <%=fullApp%>.config.WebConfig;
import <%=fullCommonDal%>.config.MyBatisConfig;
import <%=fullCommonServiceReferer%>.config.RefererConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * 系统配置
 */
@Configuration
@ComponentScan("<%=packageName%>")
@Import({
    MyBatisConfig.class,
    WebConfig.class,
    MvcConfig.class,
    RefererConfig.class
})
public class RootConfig {


}
