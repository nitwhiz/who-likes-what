<template>
  <div class="tastes-wrapper" :class="tasteType" v-if="tasteModel !== null">
    <div
      class="taste-entry"
      v-for="tasteEntry in tasteModel.tasteEntries"
      :class="getTasteClass(tasteEntry.taste)"
      @click="() => selectResult(tasteEntry.model)"
    >
      <div class="icon-wrapper">
        <img
          :src="tasteEntry.model.getTextureUrl()"
          :alt="tasteEntry.model.name"
        />
      </div>
      <div class="name-wrapper">
        <span>{{ tasteEntry.model.name }}</span>
      </div>
      <div class="taste-wrapper">
        <div class="taste-text">
          {{ getTasteString(tasteEntry.taste) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import useGiftTasteSearch from '../composables/useGiftTasteSearch';
import ItemModel from '../common/item/ItemModel';
import GiftTasteByItemRepository from '../common/taste/GiftTasteByItemRepository';
import NpcRepository from '../common/npc/NpcRepository';
import ItemRepository from '../common/item/ItemRepository';
import Taste, {
  TASTE_DISLIKE,
  TASTE_HATE,
  TASTE_LIKE,
  TASTE_LOVE,
} from '../common/taste/Taste';
import GiftTasteByNpcRepository from '../common/taste/GiftTasteByNpcRepository';
import NpcModel from '../common/npc/NpcModel';

export default defineComponent({
  setup() {
    const { selectedResult, selectResult } = useGiftTasteSearch();

    const tasteType = ref('item' as 'item' | 'npc');

    const tasteModel = computed(() => {
      if (selectedResult.value instanceof ItemModel) {
        tasteType.value = 'item';

        return new GiftTasteByItemRepository(
          new NpcRepository(),
          new ItemRepository(),
        ).getById(selectedResult.value.id);
      } else if (selectedResult.value instanceof NpcModel) {
        tasteType.value = 'npc';

        return new GiftTasteByNpcRepository(
          new NpcRepository(),
          new ItemRepository(),
        ).getById(selectedResult.value.id);
      }

      return null;
    });

    return {
      tasteModel,
      selectResult,
      tasteType,
    };
  },
  methods: {
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

  .icon-wrapper {
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

.tastes-wrapper {
  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;

  .taste-entry {
    margin: 8px;
    padding: 8px 24px 8px 8px;

    border-radius: 4px;

    width: 280px;

    display: flex;
    align-items: center;

    cursor: pointer;

    .icon-wrapper {
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
      text-align: left;
      padding-right: 8px;
      overflow: hidden;
      text-overflow: ellipsis;

      width: 100%;

      span {
        white-space: nowrap;
      }
    }

    .taste-wrapper {
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

.tastes-wrapper.npc {
  .taste-entry {
    padding: 8px 16px 8px 8px;

    width: 230px;

    .icon-wrapper {
      img {
        width: 32px;
      }
    }

    .name-wrapper {
      font-size: 14px;
    }

    .taste-wrapper {
      .taste-text {
        font-size: 10px;
      }
    }
  }
}
</style>
