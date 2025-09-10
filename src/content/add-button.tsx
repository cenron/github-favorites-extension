import { useEffect, useMemo, useState } from "react";
import {
  getFavoritesFromStorage,
  setFavoriteStorage,
  type Favorite,
} from "../utils/storage-utils";
import { getRepoInfo } from "../utils/repo-utils";

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
  }, []);

  const handleClick = async () => {
    const newFavorites = hasFavorite
      ? favorites.filter((f) => f.name !== repoInfo.name)
      : [...favorites, repoInfo];

    setFavorites(newFavorites);
    await setFavoriteStorage(newFavorites);
  };

  return (
    <button
      id="favorite-btn"
      className="Button--primary Button--small Button"
      onClick={handleClick}
    >
      {hasFavorite ? "Remove Favorite" : "Add Favorite"}
    </button>
  );
};

export default AddButton;
