package <%=fullApp%>.controller;

import <%=fullCommonServiceReferer%>.TtJaxrsProxy;
import <%=fullCoreSrvice%>.service.TtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Slahser on 18/10/2016 14:30 in gogen-nirvana
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
