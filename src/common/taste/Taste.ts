export const TASTE_LOVE = 10;
export const TASTE_LIKE = 20;
export const TASTE_NEUTRAL = 30;
export const TASTE_DISLIKE = 40;
export const TASTE_HATE = 50;

type Taste =
  | typeof TASTE_LOVE
  | typeof TASTE_LIKE
  | typeof TASTE_NEUTRAL
  | typeof TASTE_DISLIKE
  | typeof TASTE_HATE;

export interface TasteEntry<M> {
  model: M;
  taste: Taste;
}

export default Taste;
