<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const token = ref('');
const router = useRouter();

function setToken() {
    document.cookie = `token=${token.value}; path=/; Max-Age=${60 * 60 * 24 * 400}`; // 400 days = max value
    router.push('/');
}
</script>

<template>
    <h1>Set Token</h1>
    <input v-model="token" type="text" name="token" id="token">
    <button @click="setToken">Set Token</button>
</template>