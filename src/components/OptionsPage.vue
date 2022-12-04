<template>
  <section class="wrapper">
    <options-header
      :show-back="showBack"
      @add-user="addUser"
      @back="selectedIndex = -1"
    />
    <section v-if="selectedIndex > -1">
      <user-form :form="users[selectedIndex]" @save-user="updateData" />
    </section>
    <section v-else>
      <table :class="$style.userList">
        <user-item
          v-for="(formData, index) in users"
          :key="`user-${index}`"
          :form="formData"
          :index="index"
          @edit-user="selectedIndex = index"
          @delete-user="deleteUser(index)"
        />
      </table>
    </section>
  </section>
</template>

<script>
import OptionsHeader from './OptionsHeader.vue';
import UserItem from './UserItem.vue';
import UserForm from './UserForm.vue';
import defaultFormData from '../data/default.json';

export default {
  components: {
    OptionsHeader,
    UserItem,
    UserForm,
  },
  data() {
    return {
      users: [],
      selectedIndex: -1,
    };
  },
  computed: {
    showBack() {
      return this.users.length > 1 && this.selectedIndex !== -1;
    },
  },
  watch: {
    users: {
      handler() {
        chrome.storage.sync.set({ users: Array.from(this.users) });
      },
      deep: true,
    },
  },
  async beforeMount() {
    const { users } = await chrome.storage.sync.get('users');
    this.users = users;
    this.selectedIndex = this.users.length === 1 ? 0 : -1;
  },
  methods: {
    addUser() {
      this.users.push({ isNew: true, ...defaultFormData });
      this.selectedIndex = this.users.length - 1;
    },

    deleteUser(index) {
      this.users.splice(index, 1);
      this.selectedIndex = this.users.length === 1 ? 0 : -1;
    },

    updateData(formData) {
      this.users[this.selectedIndex] = formData;
    },
  },
};
</script>

<style lang="scss" module>
.userList {
  margin: 2em 0;
  width: 100%;
  border-radius: 0.5em;
  box-sizing: border-box;
}
</style>
