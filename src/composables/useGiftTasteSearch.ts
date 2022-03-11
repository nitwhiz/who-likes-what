import { ref, watch } from 'vue';

import ItemRepository from '../common/item/ItemRepository';
import NpcRepository from '../common/npc/NpcRepository';
import ItemModel from '../common/item/ItemModel';
import NpcModel from '../common/npc/NpcModel';
import Fuse from 'fuse.js';
import FuseResult = Fuse.FuseResult;

const itemRepo = new ItemRepository();
const npcRepo = new NpcRepository();

const itemFuse = itemRepo.getFuse();
const npcFuse = npcRepo.getFuse();

const searchTerm = ref('');

const itemSearchResults = ref([] as FuseResult<ItemModel>[]);
const npcSearchResults = ref([] as FuseResult<NpcModel>[]);

const selectedResult = ref(null as ItemModel | NpcModel | null);

let searchDebounceTimeout = -1;

const selectResult = (result: ItemModel | NpcModel) => {
  selectedResult.value = result;

  itemSearchResults.value = [];
  npcSearchResults.value = [];

  searchTerm.value = result.name;
};

const unselectResult = () => {
  selectedResult.value = null;
};

const selectRandom = () => {
  if (Math.random() >= 0.33) {
    selectResult(itemRepo.getRandom());
  } else {
    selectResult(npcRepo.getRandom());
  }
};

const useGiftTasteSearch = () => {
  watch(searchTerm, () => {
    if (selectedResult.value !== null) {
      return;
    }

    if (searchDebounceTimeout !== -1) {
      window.clearTimeout(searchDebounceTimeout);
    }

    searchDebounceTimeout = window.setTimeout(() => {
      itemSearchResults.value = itemFuse.search(searchTerm.value, {
        limit: 5,
      });

      npcSearchResults.value = npcFuse.search(searchTerm.value, {
        limit: 3,
      });
    }, 250);
  });

  return {
    searchTerm,
    itemSearchResults,
    npcSearchResults,
    selectedResult,
    selectResult,
    unselectResult,
    selectRandom,
  };
};

export default useGiftTasteSearch;
