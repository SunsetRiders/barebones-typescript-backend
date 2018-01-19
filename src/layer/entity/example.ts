class Example {
  public id: number;
  public name: string;

  public static fromJson(json: Example): Example {
    const example = new Example();
    if (json) {
      example.id = json.id;
      example.name = json.name;
    }
    return example;
  }

}

export default Example;
