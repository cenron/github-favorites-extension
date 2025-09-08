export const appendHtml = (
  html: string,
  attachTo: Element | null,
  elementType: string = "div"
): HTMLElement | null => {
  if (attachTo === null) return null;

  const container = document.createElement(elementType);
  container.innerHTML = html;
  attachTo.prepend(container);
  return container;
};

export const getTopBarContainer = () =>
  document.querySelector(".AppHeader-globalBar-end");

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
