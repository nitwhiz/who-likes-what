import Npcs from '../../assets/npcs.json';
import BaseRepository from '../base/BaseRepository';
import NpcModel from './NpcModel';
import Fuse from 'fuse.js';

export default class NpcRepository extends BaseRepository<
  {
    Name: string;
    Id: string;
  },
  NpcModel
> {
  constructor() {
    super('Npcs', Npcs as any);
  }

  public getById(id: string): NpcModel {
    const data = this.getDataById(id);

    return new NpcModel(data.Id, data.Name);
  }

  public getAll(): NpcModel[] {
    return this.getDataEntries().map(
      ([_, npc]) => new NpcModel(npc.Id, npc.Name),
    );
  }

  public getFuse(): Fuse<NpcModel> {
    return new Fuse(this.getAll(), {
      keys: ['name'],
      shouldSort: true,
    });
  }

  public getRandom(): NpcModel {
    const all = this.getAll();

    return all[Math.floor(Math.random() * all.length)];
  }
}
