package demo.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(SpringBootVersionRestController.class)
public class SpringBootVersionRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getSpringBootVersion() throws Exception {
        mockMvc.perform(get("/api/sb-version"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.springBootVersion").isNotEmpty());
    }

}