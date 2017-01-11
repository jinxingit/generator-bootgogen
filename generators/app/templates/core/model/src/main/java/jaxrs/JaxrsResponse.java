package <%=fullCoreModel%>.jaxrs;

import lombok.Data;

/**
 * Created by Slahser on 22/11/2016 10:47 
 */
@Data
public class JaxrsResponse {
    Integer code;
    String status;
    Object data;
    String message;
}
