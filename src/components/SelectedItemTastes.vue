<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useGiftTasteSearch, {
  NpcEntry,
  Taste,
  TASTE_DISLIKE,
  TASTE_HATE,
  TASTE_LIKE,
  TASTE_LOVE,
} from '../composables/useGiftTasteSearch';

export default defineComponent({
  setup() {
    const { selectedItemTastes } = useGiftTasteSearch();

    return {
      selectedItemTastes,
    };
  },
  methods: {
    getNPCTexture(npc: NpcEntry) {
      return `${import.meta.env.BASE_URL}textures/portraits/${npc.Id}.png`;
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

<style lang="scss" scoped>
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
