export default class NpcModel {
  public readonly id: string;

  public readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public getTextureUrl(): string {
    return `${import.meta.env.BASE_URL}textures/portraits/${this.id}.png`;
  }
}
