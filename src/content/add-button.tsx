import { useEffect, useMemo, useState } from "react";
import {
  getFavoritesFromStorage,
  setFavoriteStorage,
  type Favorite,
} from "../utils/storage-utils";
import { getRepoInfo } from "../utils/repo-utils";
import { HeartMinus, HeartPlus } from "lucide-react";

const AddButton = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [repoInfo, setRepoInfo] = useState<Favorite>({} as Favorite);

  const hasFavorite = useMemo(
    () => favorites?.some((f) => f.name === repoInfo.name),
    [favorites, repoInfo]
  );

  useEffect(() => {
    const repoInfo = getRepoInfo();
    setRepoInfo(repoInfo);
    const fetchFavorites = async () => {
      const favs = await getFavoritesFromStorage();
      setFavorites(favs);
    };
    fetchFavorites();

    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if ((areaName === "sync" || areaName === "local") && changes.favorites) {
        fetchFavorites();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleClick = async () => {
    const newFavorites = hasFavorite
      ? favorites.filter((f) => f.name !== repoInfo.name)
      : [...favorites, repoInfo];

    setFavorites(newFavorites);
    await setFavoriteStorage(newFavorites);
  };

  return (
    <div id="favorite-btn">
      <button
        className="Button--primary Button--small Button"
        onClick={handleClick}
        title={hasFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {hasFavorite ? (
          <HeartMinus className="tw:size-5" />
        ) : (
          <HeartPlus className="tw:size-5" />
        )}
      </button>
    </div>
  );
};

export default AddButton;
