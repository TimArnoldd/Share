<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useBackend } from '@/helpers/backend';

const roomName = ref('');
const token = ref('');

const backend = useBackend();
const router = useRouter();
const checkCookie = inject('checkCookie') as Function;

async function createRoom() {
    if (!roomName.value) {
        return;
    }

    const response = await backend.post('/room/create', { roomName: roomName.value });
    if (response.status !== 201) {
        return;
    }

    document.cookie = `token=${response.data.room_id}; path=/; Max-Age=${60 * 60 * 24 * 400}`; // 400 days = max value
    checkCookie();
    router.push('/chat');
}
</script>

<template>
    <h1>Create Room</h1>
    <input v-model="roomName" type="text" name="room-name" id="room-name">
    <button @click="createRoom">Create Room</button>
    <p>{{ token }}</p>
</template>