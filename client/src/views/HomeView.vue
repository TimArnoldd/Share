<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBackend } from '@/helpers/backend';

const loading = ref(true);
const messages = ref([] as { content: string }[]);
const messageContent = ref('');

const backend = useBackend();

async function fetchData() {
    loading.value = true;
    try {
        const response = await backend.get('/message/all');

        if (response.status !== 200) {
            throw new Error('Failed to fetch messages');
        }
        messages.value = response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
    } finally {
        loading.value = false;
    }
}

async function sendMessage() {
    if (!messageContent.value) {
        return;
    }

    try {
        const response = await backend.post('/message/create', { content: messageContent.value });

        if (response.status !== 201) {
            throw new Error('Failed to send message: ' + response.data.message);
        }
        const newMessage = response.data;
        messages.value.push(newMessage);
        messageContent.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

onMounted(fetchData);
</script>

<template>
    <h1>Home</h1>
    <p>Room name: TODO</p>
    <div>
        <div v-for="(message, index) in messages">
            <p>{{ message.content }}</p>
        </div>
    </div>
    <div>
        <input v-model="messageContent" type="text" name="content" id="content">
        <button @click="sendMessage">Send</button>
    </div>
</template>
