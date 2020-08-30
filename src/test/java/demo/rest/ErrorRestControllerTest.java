package demo.rest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.JsonPathExpectationsHelper;

import java.net.URI;
import java.util.function.Consumer;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT) // needed because ErrorMvcAutoConfiguration requires full servlet environment
class ErrorRestControllerTest {

    @LocalServerPort
    private int port;

    @Test
    void getsErrorAsJson() {
        RequestEntity<Void> requestEntity = RequestEntity.get(URI.create("http://localhost:" + port + "/api/not-found"))
                .build();

        ResponseEntity<String> responseEntity = new TestRestTemplate().exchange(requestEntity, String.class);

        assertThat(responseEntity.getHeaders().getContentType()).isEqualTo(MediaType.valueOf("application/json;charset=UTF-8"));
        assertThat(responseEntity.getBody()).satisfies(new ErrorJson());
    }

    private class ErrorJson implements Consumer<String> {

        @Override
        public void accept(String json) {
            pathExists("$.timestamp", json);
            pathExists("$.status", json);
            pathExists("$.error", json);
            pathExists("$.message", json);
            pathExists("$.path", json);
        }

        private void pathExists(String expression, String json) {
            new JsonPathExpectationsHelper(expression).hasJsonPath(json);
        }

    }

}
