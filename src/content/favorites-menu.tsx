import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Star, X } from "lucide-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  getFavoritesFromStorage,
  setFavoriteStorage,
  type Favorite,
} from "@/utils/storage-utils";

const FavoritesMenu = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
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

  const removeFavorite = async (fav: Favorite) => {
    const newFavorites = favorites?.filter((f) => f.name !== fav.name) ?? [];
    setFavorites(newFavorites);
    await setFavoriteStorage(newFavorites);
  };

  return (
    <div id="favorites-menu">
      <Sheet>
        <SheetTrigger asChild>
          <button className="Button--primary Button--small Button">
            <Star className="tw:size-5" />
          </button>
        </SheetTrigger>
        <SheetContent className="tw:border-border">
          <SheetHeader>
            <SheetTitle>Favorite Repository</SheetTitle>
            <SheetDescription />
          </SheetHeader>

          <div className="tw:grid tw:flex-1 tw:auto-rows-min tw:gap-4 tw:px-4 tw:overflow-auto">
            {favorites?.map((fav) => (
              <FavoriteCard favorite={fav} onRemove={removeFavorite} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove: (fav: Favorite) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ favorite, onRemove }) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove(favorite);
  };

  return (
    <a href={favorite.url} className="tw:no-underline">
      <Card className="tw:border-border">
        <CardHeader>
          <CardTitle>{favorite.name}</CardTitle>
          <CardDescription>{favorite.description}</CardDescription>
          <CardAction>
            <X onClick={handleRemoveClick} />
          </CardAction>
        </CardHeader>
      </Card>
    </a>
  );
};

export default FavoritesMenu;
