import BaseRepository from '../base/BaseRepository';
import GiftTasteByItemModel from './GiftTasteByItemModel';
import NpcRepository from '../npc/NpcRepository';
import ItemRepository from '../item/ItemRepository';
import GiftTastes from '../../assets/gift-tastes-by-npc.json';
import Taste, {
  TASTE_DISLIKE,
  TASTE_HATE,
  TASTE_LIKE,
  TASTE_LOVE,
  TASTE_NEUTRAL,
} from './Taste';

export default class GiftTasteByItemRepository extends BaseRepository<
  {
    LoveItems: string[];
    LikeItems: string[];
    DislikeItems: string[];
    HateItems: string[];
    NeutralItems: string[];
  },
  GiftTasteByItemModel
> {
  private readonly npcRepository: NpcRepository;

  private readonly itemRepository: ItemRepository;

  constructor(npcRepository: NpcRepository, itemRepository: ItemRepository) {
    super('TastesByNpc', GiftTastes);

    this.npcRepository = npcRepository;
    this.itemRepository = itemRepository;
  }

  public getTasteByNpcId(npcId: string, itemId: string): Taste {
    const npcTastes = this.getDataById(npcId);

    if (npcTastes.LoveItems.includes(itemId)) {
      return TASTE_LOVE;
    } else if (npcTastes.LikeItems.includes(itemId)) {
      return TASTE_LIKE;
    } else if (npcTastes.NeutralItems.includes(itemId)) {
      return TASTE_NEUTRAL;
    } else if (npcTastes.DislikeItems.includes(itemId)) {
      return TASTE_DISLIKE;
    }

    return TASTE_HATE;
  }

  public getById(itemId: string): GiftTasteByItemModel {
    const tastes: Record<string, Taste> = {};

    for (const npc of this.npcRepository.getAll()) {
      tastes[npc.id] = this.getTasteByNpcId(npc.id, itemId);
    }

    return new GiftTasteByItemModel(this.npcRepository, tastes);
  }
}
