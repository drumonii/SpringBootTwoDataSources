package demo.client;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

@WebMvcTest(ForwardIndexHtmlController.class)
class ForwardIndexHtmlControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void primaryRoute() throws Exception {
        mockMvc.perform(get("/primary"))
                .andExpect(forwardedUrl("index.html"));
    }

    @Test
    void secondaryRoute() throws Exception {
        mockMvc.perform(get("/secondary"))
                .andExpect(forwardedUrl("index.html"));
    }

}
