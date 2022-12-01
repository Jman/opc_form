export default function migrateUsers() {
  if(localStorage.getItem('users')) {
    const users = JSON.parse(localStorage.getItem('users'));
    localStorage.removeItem('users');
    chrome.storage.sync.set({ users });
  }
}