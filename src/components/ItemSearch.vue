<template>
  <div class="item-search">
    <div class="search-bar">
      <div class="icon-wrapper magnify">
        <template v-if="selectedItem === null">
          <IconMagnify />
        </template>
        <template v-else>
          <img
            :src="getItemTexture(selectedItem)"
            :alt="selectedItem.DisplayName"
          />
        </template>
      </div>
      <div class="text-wrapper">
        <input
          type="text"
          v-model="itemSearchTerm"
          @input="unselectItem"
          ref="searchBar"
        />
      </div>
      <div class="icon-wrapper close">
        <IconClose @click="unsetSearch" />
      </div>
      <div class="icon-wrapper dice">
        <IconDice @click="searchRandom" />
      </div>
    </div>
    <div class="search-results" v-if="itemSearchResults.length > 0">
      <div
        class="result-entry"
        v-for="r in itemSearchResults"
        :key="r.item.Id"
        @click="() => selectItem(r.item)"
      >
        <div class="icon-wrapper">
          <img :src="getItemTexture(r.item)" :alt="r.item.DisplayName" />
        </div>
        <div class="name-wrapper">
          {{ r.item.DisplayName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ItemEntry } from '../composables/useGiftTasteSearch';
import useGiftTasteSearch from '../composables/useGiftTasteSearch';

import IconMagnify from '~icons/mdi/magnify';
import IconClose from '~icons/mdi/close';
import IconDice from '~icons/mdi/dice-5-outline';

export default defineComponent({
  components: {
    IconMagnify,
    IconClose,
    IconDice,
  },
  setup() {
    const {
      selectedItem,
      itemSearchTerm,
      itemSearchResults,
      selectItem,
      unselectItem,
      searchRandom,
    } = useGiftTasteSearch();

    return {
      selectedItem,
      itemSearchTerm,
      itemSearchResults,
      selectItem,
      unselectItem,
      searchRandom,
    };
  },
  methods: {
    getItemTexture(item: ItemEntry) {
      return `${import.meta.env.BASE_URL}textures/items/${item.Id}.png`;
    },
    unsetSearch() {
      this.itemSearchTerm = '';
      this.unselectItem();

      (this.$refs.searchBar as HTMLInputElement).focus();
    },
  },
});
</script>

<style scoped lang="scss">
.item-search {
  background: #fafafa;
  width: 90%;
  max-width: 420px;

  margin: 16px auto;
  padding: 8px;
  border-radius: 22px;

  .search-bar {
    display: flex;

    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 32px;
      font-size: 20px;

      img {
        image-rendering: pixelated;
        width: 32px;
        height: auto;

        display: block;
      }

      &.magnify {
        width: 48px;
      }

      &.close,
      &.dice {
        cursor: pointer;
      }

      &.dice {
        margin-right: 4px;
      }
    }

    .unset-wrapper {
      cursor: pointer;
    }

    .text-wrapper {
      flex-grow: 1;

      input {
        width: 100%;

        font-size: 18px;
        border: 0;
        border-bottom: 1px solid #ddd;
        padding: 6px 0;
        background: 0;

        &:focus {
          outline: 0;

          border-bottom: 1px solid #777;
        }
      }
    }
  }

  .search-results {
    margin-top: 8px;

    .result-entry {
      display: flex;
      align-items: center;

      font-size: 18px;
      line-height: 48px;

      cursor: pointer;

      border-radius: 16px;

      &:hover {
        background-color: #f0f0f0;
      }

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 48px;

        img {
          image-rendering: pixelated;
          width: 32px;
          height: auto;

          display: block;
        }
      }
    }
  }
}
</style>
