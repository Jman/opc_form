import fillForm from './common/fillForm';
import log from './common/log';
// import defaultFormData from './data/default.json' assert { type: 'json' };
import defaultFormData from './data/default.json';

const extensionsId = chrome.runtime.id;
const users = [];

function executeFillForm(tabId, index = 0) {
  log('executeFillForm', { tabId, index });
  chrome.scripting.executeScript({
    target: { tabId },
    func: fillForm,
    args: [users[index]],
  });
}

function onUsersChanged(changes, area) {
  if (area === 'sync' && changes.users?.newValue) {
    log('onChanged', { changes, area });
    Object.assign(users, changes.users.newValue);
  }
}

function onMessageHandler(request, sender, sendResponse) {
  log('onMessageHandler', { request, sender, sendResponse });
  if (sender.id !== extensionsId) {
    return;
  }
  const { tabId, index } = request;
  if (tabId) {
    executeFillForm(tabId, index);
  }
  sendResponse();
}

chrome.storage.sync.get(['users'], (data) => {
  log('get', { users, data });
  if (data.users) {
    Object.assign(users, data.users);
  } else {
    chrome.storage.sync.set({ users: [defaultFormData] });
  }
});

chrome.storage.onChanged.addListener(onUsersChanged);
chrome.runtime.onMessage.addListener(onMessageHandler);
// chrome.action.onClicked.addListener(clickHandler);

// chrome.storage.sync.clear();
