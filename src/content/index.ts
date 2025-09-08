import AddButton from "./add-button/add-button.ts";

document.addEventListener("turbo:load", () => {
  console.log(`Loaded: ${document.readyState}`);

  AddButton();
});
