import { appendHtml, getRepoDetailsContainer } from "../../utils/dom-utils";
import {
  getFavoritesFromStorage,
  setFavoriteStorage,
  type Favorite,
} from "../../utils/storage-utils";
import html from "./add-button.html?raw";

/**
 * Main function to create and manage the "Add to Favorites" button.
 */
const AddButton = async () => {
  // 1. Get DOM elements and append the button
  const repoContainer = getRepoDetailsContainer();
  if (!repoContainer) return;

  const container = appendHtml(html, repoContainer, "li");
  const favoriteBtn =
    container?.querySelector<HTMLButtonElement>("#favorite-btn");
  if (!favoriteBtn) return;

  // 2. Get all necessary data once
  const currentRepo = getRepoInfo();
  let favorites = await getFavoritesFromStorage();
  let isFavorite = favorites.some((fav) => fav.name === currentRepo.name);

  // 3. Set the initial button state
  updateButtonText(favoriteBtn, isFavorite);

  // 4. Handle clicks
  favoriteBtn.addEventListener("click", async () => {
    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.name !== currentRepo.name);
    } else {
      // Add to favorites
      favorites.push(currentRepo);
    }

    // Update storage with the new list
    await setFavoriteStorage(favorites);

    // Toggle the state and update the button text
    isFavorite = !isFavorite;
    updateButtonText(favoriteBtn, isFavorite);
  });
};

/**
 * Updates the button's text based on whether the repo is a favorite.
 */
const updateButtonText = (button: HTMLButtonElement, isFavorite: boolean) => {
  button.textContent = isFavorite ? "Remove Favorite" : "Add Favorite";
};

/**
 * Scrapes the current repository's information from the page.
 */
const getRepoInfo = (): Favorite => {
  const title = document.title;
  const url = window.location.pathname;
  const splitTitle = title?.split(":");

  return {
    name: splitTitle[0]?.trim(),
    description: splitTitle[1]?.trim() ?? "", // Ensure description is always a string
    url: url,
  };
};

export default AddButton;
