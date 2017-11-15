package <%=fullCommonServiceReferer%>;

import <%=fullCoreModel%>.jaxrs.JaxrsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


@Component
public class TtJaxrsProxy {

    @Autowired
    private RestTemplate restTemplate;

    private final String referServiceUrl="localhost:8080";

    /**
     * 对象传输
     *
     * @return
     */
    public JaxrsResponse ubr() {
        return restTemplate.getForObject("http://"+referServiceUrl+"/inner-api/ttjsxrs/br", JaxrsResponse.class);
    }

    /**
     * get请求带param
     *
     * @return
     */
    public JaxrsResponse uxr() {
        return restTemplate.getForObject("http://"+referServiceUrl+"/inner-api/ttjsxrs/xr?para1=123&para2=ttt", JaxrsResponse.class);
    }

    /**
     * post请求对象
     *
     * @return
     */
    public JaxrsResponse upr() {
        TtRequest baseRequest = new TtRequest();
        baseRequest.setId(123);
        baseRequest.setMessage("tt");
        return restTemplate.postForObject("http://"+referServiceUrl+"/inner-api/ttjsxrs/pr", baseRequest, JaxrsResponse.class);
    }

}
