<template>
  <div class="item-search">
    <div class="search-bar">
      <div class="icon-wrapper magnify">
        <template v-if="selectedResult === null">
          <IconMagnify />
        </template>
        <template v-else>
          <img
            :src="selectedResult.getTextureUrl()"
            :alt="selectedResult.name"
          />
        </template>
      </div>
      <div class="text-wrapper">
        <input
          type="text"
          v-model="searchTerm"
          @input="unselectResult"
          ref="searchBar"
        />
      </div>
      <div class="icon-wrapper close">
        <IconClose @click="unsetSearch" />
      </div>
      <div class="icon-wrapper dice">
        <IconDice @click="selectRandom" />
      </div>
    </div>
    <div class="search-results" v-if="searchResults.length > 0">
      <div
        class="result-entry"
        v-for="r in searchResults"
        :key="r.item.id"
        @click="() => selectResult(r.item)"
      >
        <div class="icon-wrapper">
          <img :src="r.item.getTextureUrl()" :alt="r.item.name" />
        </div>
        <div class="name-wrapper">
          {{ r.item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
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
      selectedResult,
      searchTerm,
      itemSearchResults,
      npcSearchResults,
      selectResult,
      unselectResult,
      selectRandom,
    } = useGiftTasteSearch();

    const searchResults = computed(() => [
      ...itemSearchResults.value,
      ...npcSearchResults.value,
    ]);

    return {
      selectedResult,
      searchTerm,
      searchResults,
      selectResult,
      unselectResult,
      selectRandom,
    };
  },
  methods: {
    unsetSearch() {
      this.searchTerm = '';
      this.unselectResult();

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
