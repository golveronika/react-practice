type InputObject = Record<string, string>;

type OutputObject = {
  eventType: string;
  properties: {
    name: string;
    operator: string;
    value: string[];
  }[];
}[];

export const transformData = (input: InputObject): OutputObject => {
    const steps: Record<string, { eventType: string; properties: Record<string, any> }> = {};
  
    Object.entries(input).forEach(([key, value]) => {
      const stepMatch = key.match(/^Step_(\d+)$/);
      const propertyMatch = key.match(/^Step_(\d+)-(\d+)$/);
      const operatorMatch = key.match(/^Step_(\d+)-(\d+)-operator$/);
      const valueMatch = key.match(/^Step_(\d+)-(\d+)-operator-value-(\d+)$/);
  
      if (stepMatch) {
        const stepIndex = stepMatch[1];
        if (!steps[stepIndex]) {
          steps[stepIndex] = { eventType: value, properties: {} };
        } else {
          steps[stepIndex].eventType = value;
        }
      } else if (propertyMatch) {
        const [_, stepIndex, propIndex] = propertyMatch;
        if (!steps[stepIndex]) steps[stepIndex] = { eventType: '', properties: {} };
        if (!steps[stepIndex].properties[propIndex]) {
          steps[stepIndex].properties[propIndex] = { name: value, operator: '', value: [] };
        } else {
          steps[stepIndex].properties[propIndex].name = value;
        }
      } else if (operatorMatch) {
        const [_, stepIndex, propIndex] = operatorMatch;
        if (!steps[stepIndex]) steps[stepIndex] = { eventType: '', properties: {} };
        if (!steps[stepIndex].properties[propIndex]) {
          steps[stepIndex].properties[propIndex] = { name: '', operator: value, value: [] };
        } else {
          steps[stepIndex].properties[propIndex].operator = value;
        }
      } else if (valueMatch) {
        const [_, stepIndex, propIndex] = valueMatch;
        if (!steps[stepIndex]) steps[stepIndex] = { eventType: '', properties: {} };
        if (!steps[stepIndex].properties[propIndex]) {
          steps[stepIndex].properties[propIndex] = { name: '', operator: '', value: [value] };
        } else {
          steps[stepIndex].properties[propIndex].value.push(value);
        }
      }
    });
  
    return Object.values(steps).map(({ eventType, properties }) => ({
      eventType,
      properties: Object.values(properties),
    }));
  };