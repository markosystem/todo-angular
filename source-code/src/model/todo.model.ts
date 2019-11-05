export class Todo {

  constructor(
    public id: Number,
    public description: String,
    public done: Boolean
  ) { }

  public toString = (): string => {
    return `Todo (id: ${this.id}, description: ${this.description}, done: ${this.done})`;
  }
}
