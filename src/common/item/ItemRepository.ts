import Objects from '../../assets/items.json';
import BaseRepository from '../base/BaseRepository';
import ItemModel from './ItemModel';
import Fuse from 'fuse.js';
import FuseResult = Fuse.FuseResult;
import Items from '../../assets/items.json';

export default class ItemRepository extends BaseRepository<
  {
    DisplayName: string;
    ItemId: number;
    Id: string;
  },
  ItemModel
> {
  constructor() {
    super('Objects', Objects as any);
  }

  public getById(id: string): ItemModel {
    const data = this.getDataById(id);

    return new ItemModel(data.Id, data.DisplayName);
  }

  public getAll(): ItemModel[] {
    return this.getDataEntries().map(
      ([_, item]) => new ItemModel(item.Id, item.DisplayName),
    );
  }

  public getFuse(): Fuse<ItemModel> {
    return new Fuse(this.getAll(), {
      keys: ['name'],
      shouldSort: true,
    });
  }

  public getRandom(): ItemModel {
    const all = this.getAll();

    return all[Math.floor(Math.random() * all.length)];
  }
}
