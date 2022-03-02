<template>
  <div class="item-search">
    <div class="search-bar">
      <input type="text" v-model="itemSearchTerm" @input="unselectItem" />
    </div>
    <div class="search-results">
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
    <div class="selected-item-tastes">
      <div
        class="npc-entry"
        v-for="taste in selectedItemTastes"
        :class="getTasteClass(taste.taste)"
      >
        <div class="portrait-wrapper">
          <img :src="getNPCTexture(taste.npc)" :alt="taste.npc.Name" />
        </div>
        <div class="name-wrapper">
          {{ taste.npc.Name }}
        </div>
        <div class="taste-wrapper">
          <div class="taste-text">
            {{ getTasteString(taste.taste) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useGiftTasteSearch, {
  ItemEntry,
  NpcEntry,
  Taste,
  TASTE_DISLIKE,
  TASTE_HATE,
  TASTE_LIKE,
  TASTE_LOVE,
} from '../composables/useGiftTasteSearch';

export default defineComponent({
  setup() {
    const {
      itemSearchTerm,
      itemSearchResults,
      selectedItemTastes,
      selectItem,
      unselectItem,
    } = useGiftTasteSearch();

    return {
      itemSearchTerm,
      itemSearchResults,
      selectedItemTastes,
      selectItem,
      unselectItem,
    };
  },
  methods: {
    getItemTexture(item: ItemEntry) {
      return new URL(
        `/src/assets/textures/items/${item.Id}.png`,
        import.meta.url,
      );
    },
    getNPCTexture(npc: NpcEntry) {
      return new URL(
        `/src/assets/textures/portraits/${npc.Id}.png`,
        import.meta.url,
      );
    },
    getTasteString(taste: Taste) {
      switch (taste) {
        case TASTE_LOVE:
          return 'Love';
        case TASTE_LIKE:
          return 'Like';
        case TASTE_DISLIKE:
          return 'Dislike';
        case TASTE_HATE:
          return 'Hate';
        default:
          return 'Neutral';
      }
    },
    getTasteClass(taste: Taste) {
      switch (taste) {
        case TASTE_LOVE:
          return 'love';
        case TASTE_LIKE:
          return 'like';
        case TASTE_DISLIKE:
          return 'dislike';
        case TASTE_HATE:
          return 'hate';
        default:
          return 'neutral';
      }
    },
  },
});
</script>

<style scoped lang="scss">
.item-search {
  margin: 16px auto;
  padding: 0 16px;

  .search-bar {
    width: 300px;

    input {
      width: calc(100% - 44px);

      margin-left: 44px;

      font-size: 24px;
      border: 0;
      border-bottom: 2px solid #2c3e50;
      padding: 4px 8px 4px 0;
      background: 0;

      &:focus {
        outline: 0;
      }
    }
  }

  .search-results {
    width: 300px;

    .result-entry {
      display: flex;
      align-items: center;

      font-size: 24px;
      line-height: 48px;

      cursor: pointer;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          image-rendering: pixelated;
          width: 32px;
          height: auto;

          display: block;
        }

        margin-right: 12px;
      }
    }
  }
}

@mixin taste-wrapper-base($base-color) {
  border: 1px solid scale-color($base-color, $lightness: -25%);
  background-color: scale-color($base-color, $lightness: 50%);
  color: scale-color($base-color, $lightness: -50%);
}

@mixin item-taste-base($base-color) {
  border: 1px solid scale-color($base-color, $lightness: -30%);
  background-color: scale-color($base-color, $lightness: 85%);

  .portrait-wrapper {
    background-color: scale-color($base-color, $alpha: -60%);
  }

  .taste-wrapper .taste-text {
    @include taste-wrapper-base($base-color);
  }
}

$orange: #f8b195;
$red: #f67280;
$purpur: #c06c84;
$violet: #6c5b7b;
$blue: #355c7d;

.selected-item-tastes {
  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;

  .npc-entry {
    margin: 8px;
    padding: 8px 24px 8px 8px;

    border-radius: 4px;

    width: 280px;

    display: flex;
    align-items: center;

    .portrait-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 3px;
      margin-right: 12px;

      img {
        image-rendering: pixelated;
        width: 64px;
        height: auto;

        display: block;
      }
    }

    .name-wrapper {
      font-size: 18px;
      text-align: center;
    }

    .taste-wrapper {
      width: 100%;

      display: flex;
      justify-content: flex-end;

      .taste-text {
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 12px;

        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    &.love {
      @include item-taste-base($purpur);
    }

    &.like {
      @include item-taste-base($blue);
    }

    &.neutral {
      @include item-taste-base($violet);
    }

    &.dislike {
      @include item-taste-base($orange);
    }

    &.hate {
      @include item-taste-base($red);
    }
  }
}
</style>
