import NpcModel from '../npc/NpcModel';
import ItemModel from '../item/ItemModel';
import Taste, {
  TASTE_DISLIKE,
  TASTE_HATE,
  TASTE_LIKE,
  TASTE_LOVE,
  TASTE_NEUTRAL,
  TasteEntry,
} from './Taste';

export default class GiftTasteByNpcModel {
  public readonly tasteEntries: TasteEntry<NpcModel>[];

  constructor(
    npc: NpcModel,
    love: ItemModel[],
    like: ItemModel[],
    dislike: ItemModel[],
    hate: ItemModel[],
    neutral: ItemModel[],
  ) {
    this.tasteEntries = [
      love.map((item) => ({
        model: item,
        taste: TASTE_LOVE as Taste,
      })),
      like.map((item) => ({
        model: item,
        taste: TASTE_LIKE as Taste,
      })),
      neutral.map((item) => ({
        model: item,
        taste: TASTE_NEUTRAL as Taste,
      })),
      dislike.map((item) => ({
        model: item,
        taste: TASTE_DISLIKE as Taste,
      })),
      hate.map((item) => ({
        model: item,
        taste: TASTE_HATE as Taste,
      })),
    ].flat();
  }
}
