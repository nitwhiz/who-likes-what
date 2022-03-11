export default class ItemModel {
  public readonly id: string;

  public readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public getTextureUrl(): string {
    return `${import.meta.env.BASE_URL}textures/items/${this.id}.png`;
  }
}
