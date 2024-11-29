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
      const newUrl = `https://archive.is/${currentUrl}`;
      console.log(`attempt redirect to: ${newUrl}`);
      chrome.tabs.update(currentTabId, { url: newUrl });
      // chrome.tabs.sendMessage(currentTabId, {
      //   message: "redirectToArchiveIs",
      //   currentUrl,
      // });
    }
  });
};

const archiveisButton = document.getElementsByClassName("archiveisbutton")[0];
console.log("SAND", archiveisButton);

archiveisButton.addEventListener("click", (event) => {
  console.log(`archive.is button clicked!`);
  redirectToArchiveIs(event.currentTarget, event.target);
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
