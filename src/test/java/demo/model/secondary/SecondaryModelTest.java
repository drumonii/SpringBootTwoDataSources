package demo.model.secondary;

import demo.model.secondary.builder.SecondaryModelBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.json.JsonContent;
import org.springframework.boot.test.json.ObjectContent;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;

@JsonTest
class SecondaryModelTest {

    @Autowired
    private JacksonTester<SecondaryModel> jacksonTester;

    @Test
    void serializesIntoJson() {
        SecondaryModel secondaryModel = new SecondaryModelBuilder()
                .withName("Hello World")
                .build();
        secondaryModel.setId(2381652);

        JsonContent<SecondaryModel> jsonContent = null;
        try {
            jsonContent = jacksonTester.write(secondaryModel);
        } catch (IOException e) {
            fail("Unable to serialize SecondaryModel into JSON", e);
        }

        assertThat(jsonContent).hasJsonPathValue("$.id");
        assertThat(jsonContent).hasJsonPathStringValue("$.name");
    }

    @Test
    void deserializesFromJson() {
        String json =
                "{" +
                "  \"id\": 2381652," +
                "  \"name\": \"Hello World\"" +
                "}";

        ObjectContent<SecondaryModel> content = null;
        try {
            content = jacksonTester.parse(json);
        } catch (IOException e) {
            fail("Unable to deserialize SecondaryModel from JSON", e);
        }

        assertThat(content.getObject()).isNotNull();
        assertThat(content.getObject().getId()).isEqualTo(2381652);
        assertThat(content.getObject().getName()).isEqualTo("Hello World");
    }

}
