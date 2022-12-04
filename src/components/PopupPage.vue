<template>
  <h1>Select user:</h1>
  <ul>
    <li
      v-for="(formData, index) in users"
      :key="`user-${index}`"
      @click="selectUser(index)"
    >
      {{ formData.email }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  async beforeMount() {
    const { users } = await chrome.storage.sync.get('users');
    if (users.length === 1) {
      this.selectUser(0);
    }
    this.users = users;
  },
  methods: {
    async selectUser(index) {
      const query = { active: true, currentWindow: true };
      const tabs = await chrome.tabs.query(query);
      const tabId = tabs[0].id;
      chrome.runtime.sendMessage({ tabId, index }, () => window.close());
    },
  },
};
</script>
