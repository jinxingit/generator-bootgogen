package <%=fullCommonServiceExporter%>;

import <%=fullCoreModel%>.jaxrs.JaxrsResponse;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by Slahser on 14/12/2016 12:24 
 */
@Path("/ttjsxrs")
@Component
public class TtJaxrs {

    @Path("/s2")
    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public String s2() {
        return "s2";
    }

    @Path("/br")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public JaxrsResponse br() {
        JaxrsResponse JaxrsResponse = new JaxrsResponse();
        JaxrsResponse.setCode(123);
        JaxrsResponse.setData("dataString");
        JaxrsResponse.setMessage("success this time");
        JaxrsResponse.setStatus("success");
        return JaxrsResponse;
    }

    @Path("/xr")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public JaxrsResponse xr(@QueryParam("para1") Integer a, @QueryParam("para2") String b) {
        JaxrsResponse JaxrsResponse = new JaxrsResponse();
        JaxrsResponse.setMessage(a + b);
        return JaxrsResponse;
    }

    @Path("/pr")
    @POST
    @Produces({MediaType.APPLICATION_JSON})
    public JaxrsResponse pr(TtRequest br) {
        int a = br.getId();
        String b = br.getMessage();
        JaxrsResponse JaxrsResponse = new JaxrsResponse();
        JaxrsResponse.setMessage(a + b);
        return JaxrsResponse;
    }

}
