import { createRoot } from "react-dom/client";
import AddButton from "./add-button";
import { getElementByXPath } from "../utils/dom-utils";
import FavoritesMenu from "./favorites-menu";

import styles from "./index.css?inline";

// Inject styles globally once
const styleEl = document.createElement("style");
styleEl.id = "github-favorites-styles";
styleEl.textContent = styles;
if (!document.getElementById(styleEl.id)) {
  document.head.appendChild(styleEl);
}

const getRepoDetailsContainer = () =>
  getElementByXPath('//*[@id="repository-details-container"]/ul');
const getAppHeaderGlobalBarEnd = () =>
  document.querySelector(".AppHeader-globalBar-end");

document.addEventListener("turbo:load", () => {
  embedFavoriteButton();
  embedFavoritesMenu();
});

const embedFavoriteButton = () => {
  const topBar = getRepoDetailsContainer();
  if (!topBar) return;
  if (topBar.querySelector("#favorite-btn")) return;

  const li = document.createElement("li");
  topBar.prepend(li);

  const root = createRoot(li);
  root.render(<AddButton />);
};

const embedFavoritesMenu = () => {
  const appHeader = getAppHeaderGlobalBarEnd();
  if (!appHeader) return;

  const container = document.createElement("div");
  appHeader.prepend(container);

  const root = createRoot(container);
  root.render(<FavoritesMenu />);
};
