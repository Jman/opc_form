<template>
  <tr @click.prevent="$emit('editUser')">
    <td :class="$style.index">
      {{ index }}
    </td>
    <td :class="$style.name">
      {{ form.email }}
    </td>
    <td :class="$style.actions">
      <button>Edit</button>
      <button @click.stop.prevent="$emit('deleteUser')">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  emits: ['editUser', 'deleteUser'],
};
</script>

<style lang="scss" module>
.index {
  width: 1px;
  padding-right: 0;
}

.name {
  text-align: left;
}

.actions {
  text-align: right;
  white-space: nowrap;
}
</style>
