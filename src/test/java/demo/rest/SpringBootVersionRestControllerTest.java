package demo.rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SpringBootVersionRestController.class)
class SpringBootVersionRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getSpringBootVersion() throws Exception {
        mockMvc.perform(get("/api/sb-version"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.springBootVersion").isNotEmpty());
    }

}
