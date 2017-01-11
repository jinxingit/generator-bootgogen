package <%=fullCommonServiceExporter%>.config;

import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * Created by Slahser on 14/12/2016 12:19 
 * <p>
 * <p>
 *
 * @javax.ws.rs.PathParam： 从URI模板参数中提取数据 @Path("/address/{id}")  @PathParam("id") String addressId
 * @javax.ws.rs.MatrixParam：从URI中提取Matrix参数
 * @javax.ws.rs.QueryParam：从URI中提取查询参数 @QueryParam("start") int start
 * @javax.ws.rs.FormParam：提取Post Form参数 @FormParam("firstname") String first
 * @javax.ws.rs.HeaderParam：提取HTTP请求头信息 @HeaderParam("Referer") String referer
 * @javax.ws.rs.CookieParam：提取客户设置的cookie的信息 @CookieParam("customerId") int custId
 * @javax.ws.rs.core.Context：通用的注入annotation，允许注入各种帮助或者信息对象 @Context UriInfo info @Context HttpHeaders headers
 * </p>
 */
@Component
@ApplicationPath("/inner-api")
public class JaxrsApplication extends Application {
}
