<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBackend } from '@/helpers/backend';

const loading = ref(true);
const tokenExists = ref(false);
const messages = ref([] as { content: string, createdAt: string, updatedAt: string }[]);
const messageContent = ref('');
const room = ref({ name: 'loading...' } as { room_id: string, name: string });

const backend = useBackend();

async function checkCookieAndFetchData() {
    loading.value = true;
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
        tokenExists.value = true;
        fetchRoomName();
        fetchMessages();
    } else {
        tokenExists.value = false;
        loading.value = false;
    }
}

async function fetchRoomName() {
    try {
        const response = await backend.get('/room');

        if (response.status !== 200) {
            throw new Error('Failed to room');
        }
        room.value = response.data;
    } catch (error) {
        console.error('Error fetching room:', error);
    }
}

async function fetchMessages() {
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

onMounted(checkCookieAndFetchData);
</script>

<template>
    <h1>Share.vodka</h1>
    <div v-if="loading">Loading messages...</div>
    <template v-else>
        <p>Room ID: {{ room.room_id }}</p>
        <p>Room name: {{ room.name }}</p>
        <hr>
        <div class="messages">
            <div v-for="(message, index) in messages" class="message">
                <div class="message-content">{{ message.content }}</div>
                <div class="message-timestamp">{{ message.updatedAt }}</div>
            </div>
        </div>
        <hr>
        <div>
            <input v-model="messageContent" type="text" name="content" id="content">
            <button @click="sendMessage">Send</button>
        </div>
    </template>
</template>

<style scoped lang="scss">
hr {
    margin: 0;
}

.messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0;

    .message {
        display: flex;
        width: calc(100% - 30px);
        border-bottom: 1px solid base.$color-highlight-alternative;
        padding: 5px 0;
        margin: 0 15px;

        &:last-child {
            border-bottom: none;
        }

        .message-content {
            width: 50%;
        }

        .message-timestamp {
            width: 50%;
            text-align: right;
        }
    }
}
</style>
