package <%=fullCoreModel%>.jaxrs;

import lombok.Data;

@Data
public class JaxrsResponse {
    Integer code;
    String status;
    Object data;
    String message;
}
