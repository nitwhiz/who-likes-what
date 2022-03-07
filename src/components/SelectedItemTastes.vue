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
        <div class="name">
          {{ taste.npc.Name }}
        </div>
        <div class="friendship">
          <div class="hearts-wrapper">
            <img
              src="/heart-filled.png"
              alt="1"
              v-for="_ in getHeartFilledCount(taste.npc.Name)"
            />
            <img
              src="/heart.png"
              alt="0"
              v-for="_ in getHeartEmptyCount(taste.npc.Name)"
            />
          </div>
        </div>
      </div>
      <div class="taste-wrapper">
        <div class="taste-text">
          {{ getTasteString(taste.taste) }}
        </div>
        <div class="gifts">
          <div
            class="gift"
            v-for="i in 2"
            :class="getGiftCount(taste.npc.Name) >= i ? 'gifted' : void 0"
          >
            <img src="/gift.png" alt="gift" />
          </div>
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
import useValleyServer from '../composables/useValleyServer';

export default defineComponent({
  setup() {
    const { selectedItemTastes } = useGiftTasteSearch();
    const { npcLocationData } = useValleyServer();

    return {
      selectedItemTastes,
      npcLocationData,
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
    getGiftCount(npcName: string) {
      return this.npcLocationData[npcName]?.npcGiftsThisWeek || 0;
    },
    getHeartFilledCount(npcName: string) {
      return this.npcLocationData[npcName]?.npcFriendshipPoints || 0;
    },
    getHeartEmptyCount(npcName: string) {
      return Math.max(
        0,
        10 - (this.npcLocationData[npcName]?.npcFriendshipPoints || 0),
      );
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

      width: 100%;

      .friendship {
        margin-top: 8px;

        .hearts-wrapper {
          display: flex;
          flex-wrap: wrap;

          img {
            image-rendering: pixelated;
          }
        }
      }
    }

    .taste-wrapper {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      .taste-text {
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 12px;

        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .gifts {
        margin-top: 8px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;

        .gift {
          &:last-child {
            margin-right: 6px;
          }

          img {
            opacity: 0.25;
          }

          &.gifted {
            img {
              opacity: 1;
            }
          }
        }
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
