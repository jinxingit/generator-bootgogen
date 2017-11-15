package <%=fullApp%>.controller;

import <%=fullCommonServiceReferer%>.TtJaxrsProxy;
import <%=fullCoreSrvice%>.service.TtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 示例
 */
@RestController
public class TtController {

    @Autowired
    public TtService ttService;

    @Autowired
    private TtJaxrsProxy ttJaxrsProxy;

//    @RequestMapping(value = "/tt", produces = {"application/json;charset=UTF-8"})
//    public String tt() {
//        return ttService.getOne();
//        retutn ttJaxrsProxy.getOne();
//    }


}
