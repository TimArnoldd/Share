<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useBackend } from '@/helpers/backend';
import { toastError, toastSuccess } from '@/helpers/toast';
import { setTokenInCookie } from '@/helpers/cookie';

const roomName = ref('');
const token = ref('');

const backend = useBackend();
const router = useRouter();
const checkCookie = inject('checkCookie') as Function;

async function createRoom() {
    try {
        if (!roomName.value) {
            toastError('Please enter a name.');
            return;
        }

        const response = await backend.post('/room/create', { roomName: roomName.value }).catch((error) => {
            throw new Error('An error occurred while creating the room.');
        });

        setTokenInCookie(response.data.room_id);
        toastSuccess('Room created successfully!');
        checkCookie();
        router.push('/chat');
    } catch (error: any) {
        toastError('Error creating room', error.message);
        console.error('Error creating room:', error);
    }
}
</script>

<template>
    <h1>Create Room</h1>
    <input v-model="roomName" type="text" name="room-name" id="room-name">
    <button @click="createRoom">Create Room</button>
    <p>{{ token }}</p>
</template>