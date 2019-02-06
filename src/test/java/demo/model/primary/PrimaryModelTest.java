package demo.model.primary;

import demo.model.primary.builder.PrimaryModelBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.json.JsonContent;
import org.springframework.boot.test.json.ObjectContent;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;

@RunWith(SpringRunner.class)
@JsonTest
public class PrimaryModelTest {

    @Autowired
    private JacksonTester<PrimaryModel> jacksonTester;

    @Test
    public void serializesIntoJson() {
        PrimaryModel primaryModel = new PrimaryModelBuilder()
                .withName("Hello World")
                .build();
        primaryModel.setId(2381652);

        JsonContent<PrimaryModel> jsonContent = null;
        try {
            jsonContent = jacksonTester.write(primaryModel);
        } catch (IOException e) {
            fail("Unable to serialize PrimaryModel into JSON", e);
        }

        assertThat(jsonContent).hasJsonPathValue("$.id");
        assertThat(jsonContent).hasJsonPathStringValue("$.name");
    }

    @Test
    public void deserializesFromJson() {
        String json =
                "{" +
                "  \"id\": 2381652," +
                "  \"name\": \"Hello World\"" +
                "}";

        ObjectContent<PrimaryModel> content = null;
        try {
            content = jacksonTester.parse(json);
        } catch (IOException e) {
            fail("Unable to deserialize PrimaryModel from JSON", e);
        }

        assertThat(content.getObject()).isNotNull();
        assertThat(content.getObject().getId()).isEqualTo(2381652);
        assertThat(content.getObject().getName()).isEqualTo("Hello World");
    }

}