package <%=fullApp%>.controller.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * controller切面
 * 异常拦截，参数绑定，属性设置
 */
@ControllerAdvice
@Slf4j
public class TtControllerAdvice{

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Map<String, Object> exception(Exception ex, HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

    @ModelAttribute
    public void addAttributes(Model model) {
        //model.addAttribute("msg", "额外信息");
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) throws Exception {

    }

}
