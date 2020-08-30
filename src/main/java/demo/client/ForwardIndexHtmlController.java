package demo.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Forwards all other non REST routes to the index.html for Angular to handle the route.
 * Inspired by JHipster's ClientForwardController.
 */
@Controller
public class ForwardIndexHtmlController {

    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forwardToIndexHtml() {
        return "forward:index.html";
    }

}
