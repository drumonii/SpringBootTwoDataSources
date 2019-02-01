export interface ActuatorEnvResponse {
  propertySources: PropertySource[];
}

interface PropertySource {
  name: string;
  properties: Properties;
}

interface Properties {
  [key: string]: PropertyValue;
}

interface PropertyValue {
  value: any;
  origin: string;
}
