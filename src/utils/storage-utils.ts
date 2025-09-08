export interface Favorite {
  name: string;
  url: string;
  description: string;
}

export const getFavoritesFromStorage = async (): Promise<Favorite[]> => {
  const { favorites = [] }: { favorites: Favorite[] } =
    await chrome.storage.sync.get("favorites");
  return favorites;
};

export const setFavoriteStorage = async (favorites: Favorite[]) => {
  await chrome.storage.sync.set({ favorites: favorites });
};
