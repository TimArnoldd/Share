<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useBackend } from '@/helpers/backend';
import { toastError } from '@/helpers/toast';
import { useRouter } from 'vue-router';
import { getTokenFromCookie } from '@/helpers/cookie';

const loading = ref(true);
const messages = ref([] as { content: string, createdAt: string, updatedAt: string }[]);
const messageContent = ref('');
const room = ref({ name: 'loading...' } as { room_id: string, name: string });

const backend = useBackend();
const router = useRouter();

async function checkCookieAndFetchData() {
    loading.value = true;
    if (getTokenFromCookie()) {
        fetchRoomName();
        fetchMessages();
    } else {
        toastError('No token found', 'Please set a token or create a room.');
        router.push('/');
    }
}

async function fetchRoomName() {
    try {
        const response = await backend.get('/room').catch((error) => {
            if (error.response?.data) {
                throw new Error('There is no valid token set. Please set a token or create a room.');
            }
            throw new Error('An error occurred while loading the room.');
        });
        room.value = response.data;
    } catch (error) {
        console.error('Error fetching room:', error);
    }
}

async function fetchMessages() {
    loading.value = true;
    try {
        const response = await backend.get('/message/all').catch((error) => {
            if (error.response?.data) {
                throw new Error('There is no valid token set. Please set a token or create a room.');
            }
            throw new Error('An error occurred while loading the messages.');
        });
        messages.value = response.data;
        loading.value = false;
    } catch (error) {
        toastError('Error loading messages', error.message);
        console.error('Error fetching messages:', error);
    }
}

async function sendMessage() {
    const message = messageContent.value.trim();
    if (!message) {
        toastError('Please enter a message.');
        messageContent.value = '';
        return;
    }

    try {
        const response = await backend.post('/message/create', { content: message }).catch((error) => {
            throw new Error('An error occurred while sending the message.');
        });
        const newMessage = response.data;
        messages.value.push(newMessage);
        messageContent.value = '';
    } catch (error) {
        toastError('Error sending message', error.message);
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
