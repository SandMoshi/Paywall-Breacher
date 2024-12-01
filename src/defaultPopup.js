let removeSearchQuery;

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const redirectToArchiveIs = () => {
  getCurrentTab().then((currentTab) => {
    if (currentTab.url) {
      const currentTabId = currentTab.id;
      const currentUrl = currentTab.url;
      const newUrl = new URL(`https://archive.is/${currentUrl}`);
      if (removeSearchQuery != false) {
        newUrl.search = "";
      }
      console.log(`attempting to redirect to: ${newUrl.toString()}`);
      chrome.tabs.update(currentTabId, { url: newUrl.toString() });
    }
  });
};

const archiveisButton = document.getElementsByClassName("archiveisbutton")[0];
const removeSearchQueryCheckbox = document.getElementById(
  "searchQueryCheckbox"
);

archiveisButton &&
  archiveisButton.addEventListener("click", (event) => {
    console.log(`archive.is button clicked!`);
    redirectToArchiveIs(event.currentTarget, event.target);
  });

removeSearchQueryCheckbox.addEventListener("change", (event) => {
  removeSearchQuery = event.target.checked;
});

function localizeStrings() {
  document.querySelectorAll("[data-locale]").forEach((elem) => {
    elem.innerText = chrome.i18n.getMessage(elem.dataset.locale);
  });
}

localizeStrings();

function loadPreviousSettings() {
  console.log("load previous settings");
  // retrieve from local storage and act upon them here
}

window.onload = () => {
  loadPreviousSettings();
};
