import { ref } from 'vue';

export interface NpcLocation {
  npcName: string;
  npcHasBirthday: boolean;
  npcFriendshipPoints: number;
  npcGiftsThisWeek: number;
  locationName: string;
  tileX: number;
  tileY: number;
}

const requestNpcLocations = () => {
  return fetch('http://localhost:3000/locations/npcs')
    .then((response) => response.json() as unknown as NpcLocation[])
    .catch((e) => {
      console.log('valley server is not available', e);

      return [];
    });
};

let interval = -1;

const npcLocationData = ref({} as Record<string, NpcLocation>);

const useValleyServer = () => {
  if (interval === -1) {
    interval = window.setInterval(async () => {
      npcLocationData.value = (await requestNpcLocations()).reduce(
        (a: Record<string, NpcLocation>, c: NpcLocation) => {
          a[c.npcName] = c;

          return a;
        },
        {} as Record<string, NpcLocation>,
      );
    }, 5000);
  }

  return {
    npcLocationData,
  };
};

export default useValleyServer;
