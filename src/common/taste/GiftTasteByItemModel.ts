import NpcModel from '../npc/NpcModel';
import NpcRepository from '../npc/NpcRepository';
import Taste, { TasteEntry } from './Taste';

export default class GiftTasteByItemModel {
  public readonly tasteEntries: TasteEntry<NpcModel>[];

  constructor(
    npcRepository: NpcRepository,
    tasteByNpcId: Record<string, Taste>,
  ) {
    this.tasteEntries = [];

    for (const npcId of Object.keys(tasteByNpcId)) {
      this.tasteEntries.push({
        model: npcRepository.getById(npcId),
        taste: tasteByNpcId[npcId],
      });
    }

    this.tasteEntries.sort((a, b) => a.taste - b.taste);
  }
}
