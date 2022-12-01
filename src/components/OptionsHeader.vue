<template>
  <header>
    <h1>Magento Form Filler</h1>
    <button v-if="showBack" class="back" @click="back">Back</button>
    <button v-else @click="addUser">Create New User</button>
  </header>
</template>

<script>
export default {
  props: {
    showBack: {
      type: Boolean,
    },
  },
  emits: ['addUser', 'back', 'test'],
  methods: {
    addUser() {
      this.$emit('addUser');
    },
    back() {
      this.$emit('back');
    },
  },
};
</script>
