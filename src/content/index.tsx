import { createRoot } from "react-dom/client";
import AddButton from "./add-button";

export const getRepoDetailsContainer = () =>
  getElementByXPath('//*[@id="repository-details-container"]/ul');

function getElementByXPath(path: string): HTMLElement | null {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement | null;
}

document.addEventListener("turbo:load", () => {
  embedFavoriteButton();
});

const embedFavoriteButton = () => {
  const topBar = getRepoDetailsContainer();
  if (!topBar) return;
  if (topBar.querySelector("#favorite-btn")) return;

  const el = document.createElement("li");
  topBar.prepend(el);

  const root = createRoot(el);
  root.render(<AddButton />);
};
