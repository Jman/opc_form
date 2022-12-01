<template>
  <tr @click.prevent="$emit('editUser')">
    <td class="index">
      {{ index }}
    </td>
    <td class="name">
      {{ form.email }}
    </td>
    <td class="actions">
      <a href="#">edit</a> |
      <a href="#" @click.stop.prevent="$emit('deleteUser')">delete</a>
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
