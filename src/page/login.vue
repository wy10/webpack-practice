<template>
  <div id="login" @click="() => emits('login', 'success')">{{ text }}</div>
</template>
<script setup>
const emits = defineEmits(["login"]);
const props = defineProps({
  text: {
    type: String,
  },
});
</script>
