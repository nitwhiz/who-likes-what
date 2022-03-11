export default abstract class BaseRepository<T, M> {
  private readonly baseKey: string;

  private readonly data: Record<string, Record<string, T>>;

  protected constructor(
    baseKey: string,
    data: Record<string, Record<string, T>>,
  ) {
    this.baseKey = baseKey;
    this.data = data;

    if (!(this.baseKey in this.data)) {
      throw new Error('baseKey not found in data');
    }
  }

  protected getDataEntries(): [string, T][] {
    return Object.entries(this.data[this.baseKey]);
  }

  protected getDataById(id: string): T {
    return this.data[this.baseKey][id];
  }

  public abstract getById(id: string): M;

  public getAll(): M[] {
    return [];
  }
}
