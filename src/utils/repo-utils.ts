import type { Favorite } from "./storage-utils";

/**
 * Scrapes the current repository's information from the page.
 */
export const getRepoInfo = (): Favorite => {
  const title = document.title;
  const url = window.location.pathname;
  const splitTitle = title?.split(":");

  return {
    name: splitTitle[0]?.trim(),
    description: splitTitle[1]?.trim() ?? "", // Ensure description is always a string
    url: url,
  };
};
