package demo.rest;

import org.springframework.boot.SpringBootVersion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.AbstractMap.SimpleEntry;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/sb-version")
public class SpringBootVersionRestController {

    @GetMapping
    public Map<String, String> getSpringBootVersion() {
        return Stream.of(new SimpleEntry<>("springBootVersion", SpringBootVersion.getVersion()))
                .collect(Collectors.toMap(SimpleEntry::getKey, SimpleEntry::getValue));
    }

}
