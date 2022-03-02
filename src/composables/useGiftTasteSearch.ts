import { ref, watch } from 'vue';
import GiftTastes from '../assets/gift-tastes-by-npc.json';
import Npcs from '../assets/npcs.json';
import Items from '../assets/items.json';
import Fuse from 'fuse.js';
import FuseResult = Fuse.FuseResult;

export interface GiftTasteEntry {
  LoveItems: string[];
  LikeItems: string[];
  DislikeItems: string[];
  HateItems: string[];
  NeutralItems: string[];
}

export interface GiftTastesByNPCData {
  TastesByNpc: {
    [id: string]: GiftTasteEntry;
  };
}

export interface ItemEntry {
  DisplayName: string;
  ItemId: string;
  Id: string;
}

export interface ItemsData {
  Objects: {
    [id: string]: ItemEntry;
  };
}

export interface NpcEntry {
  Name: string;
  Id: string;
}

export interface NpcsData {
  Npcs: {
    [id: string]: NpcEntry;
  };
}

export const TASTE_LOVE = 10;
export const TASTE_LIKE = 20;
export const TASTE_NEUTRAL = 30;
export const TASTE_DISLIKE = 40;
export const TASTE_HATE = 50;

export type Taste =
  | typeof TASTE_LOVE
  | typeof TASTE_LIKE
  | typeof TASTE_NEUTRAL
  | typeof TASTE_DISLIKE
  | typeof TASTE_HATE;

export interface GiftTaste {
  npc: NpcEntry;
  taste: Taste;
}

const itemSearchTerm = ref('');
const itemSearchResults = ref([] as FuseResult<ItemEntry>[]);

const selectedItem = ref(null as ItemEntry | null);
const selectedItemTastes = ref([] as GiftTaste[]);

let searchDebounceTimeout = -1;

const fuse = new Fuse(Object.values((Items as unknown as ItemsData).Objects), {
  keys: ['DisplayName'],
  shouldSort: true,
});

const selectItem = (item: ItemEntry) => {
  selectedItem.value = item;

  itemSearchResults.value = [];
  itemSearchTerm.value = item.DisplayName;

  selectedItemTastes.value = Object.entries(GiftTastes.TastesByNpc)
    .map(([npcId, tasteData]) => {
      let taste: Taste = TASTE_NEUTRAL;

      if ((tasteData as GiftTasteEntry).LoveItems.includes(item.Id)) {
        taste = TASTE_LOVE;
      } else if ((tasteData as GiftTasteEntry).LikeItems.includes(item.Id)) {
        taste = TASTE_LIKE;
      } else if ((tasteData as GiftTasteEntry).DislikeItems.includes(item.Id)) {
        taste = TASTE_DISLIKE;
      } else if ((tasteData as GiftTasteEntry).HateItems.includes(item.Id)) {
        taste = TASTE_HATE;
      }

      return {
        npc: (Npcs as NpcsData).Npcs[npcId],
        taste,
      };
    })
    .sort((tasteA, tasteB) => {
      return tasteA.taste - tasteB.taste;
    });
};

const unselectItem = () => {
  selectedItem.value = null;
  selectedItemTastes.value = [];
};

const useGiftTasteSearch = () => {
  watch(itemSearchTerm, () => {
    if (selectedItem.value !== null) {
      return;
    }

    if (searchDebounceTimeout !== -1) {
      window.clearTimeout(searchDebounceTimeout);
    }

    searchDebounceTimeout = window.setTimeout(() => {
      itemSearchResults.value = fuse.search(itemSearchTerm.value, {
        limit: 5,
      });
    }, 250);
  });

  return {
    itemSearchTerm,
    itemSearchResults,
    selectedItem,
    selectedItemTastes,
    selectItem,
    unselectItem,
  };
};

export default useGiftTasteSearch;
