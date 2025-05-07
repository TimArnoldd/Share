<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBackend } from '@/helpers/backend';

const roomName = ref('');
const token = ref('');

const backend = useBackend();

async function createRoom() {
    if (!roomName.value) {
        return;
    }

    const response = await backend.post('/room/create', { roomName: roomName.value });
    if (response.status !== 201) {
        return;
    }

    const room = response.data;
    token.value = room.room_id;
}
</script>

<template>
    <h1>Create Room</h1>
    <input v-model="roomName" type="text" name="room-name" id="room-name">
    <button @click="createRoom">Create Room</button>
    <p>{{ token }}</p>
</template>