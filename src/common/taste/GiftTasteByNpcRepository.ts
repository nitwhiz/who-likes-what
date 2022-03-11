import GiftTastes from '../../assets/gift-tastes-by-npc.json';
import BaseRepository from '../base/BaseRepository';
import GiftTasteByNpcModel from './GiftTasteByNpcModel';
import NpcRepository from '../npc/NpcRepository';
import ItemRepository from '../item/ItemRepository';
import ItemModel from '../item/ItemModel';

export default class GiftTasteByNpcRepository extends BaseRepository<
  {
    LoveItems: string[];
    LikeItems: string[];
    DislikeItems: string[];
    HateItems: string[];
    NeutralItems: string[];
  },
  GiftTasteByNpcModel
> {
  private readonly npcRepository: NpcRepository;

  private readonly itemRepository: ItemRepository;

  constructor(npcRepository: NpcRepository, itemRepository: ItemRepository) {
    super('TastesByNpc', GiftTastes);

    this.npcRepository = npcRepository;
    this.itemRepository = itemRepository;
  }

  private getItemModelsByItemIds(ids: string[]): ItemModel[] {
    return ids
      .map((itemId) => this.itemRepository.getById(itemId))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  public getById(npcId: string): GiftTasteByNpcModel {
    const result = this.getDataById(npcId);

    return new GiftTasteByNpcModel(
      this.npcRepository.getById(npcId),
      this.getItemModelsByItemIds(result.LoveItems),
      this.getItemModelsByItemIds(result.LikeItems),
      this.getItemModelsByItemIds(result.NeutralItems),
      this.getItemModelsByItemIds(result.DislikeItems),
      this.getItemModelsByItemIds(result.HateItems),
    );
  }
}
