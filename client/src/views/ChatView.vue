<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useBackend } from '@/helpers/backend';
import { toastError, toastSuccess } from '@/helpers/toast';
import { useRouter } from 'vue-router';
import { getTokenFromCookie } from '@/helpers/cookie';
import { Message } from '@/viewModels/message';


const messages = ref([] as Message[]);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const loading = ref(true);
const messageContent = ref('');
const room = ref({ name: 'loading...' } as { room_id: string, name: string });

const backend = useBackend();
const router = useRouter();

const messagesByDate = ref([] as { date: string, messages: Message[] }[]);

function formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}. ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatDisplayDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (formatDate(date) === formatDate(today)) {
        return "Today";
    } else if (formatDate(date) === formatDate(yesterday)) {
        return "Yesterday";
    } else {
        return formatDate(date);
    }
}

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
        messages.value = response.data.map((message: any) => {
            return new Message(
                message.message_id,
                message.content,
                message.createdAt,
                message.updatedAt,
            );
        })
        loading.value = false;
    } catch (error: any) {
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
        const newMessage = new Message(
            response.data.message_id,
            response.data.content,
            response.data.createdAt,
            response.data.updatedAt,
        );
        messages.value.push(newMessage);
        messageContent.value = '';
    } catch (error: any) {
        toastError('Error sending message', error.message);
        console.error('Error sending message:', error);
    }
}

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        toastSuccess('Copied to clipboard');
    } catch (err: any) {
        toastError('Failed to copy to clipboard', err.message);
        console.error('Failed to copy:', err.message);
    }
}

watch(messages, () => {
    const sortedMessages = [...messages.value].sort((a, b) =>
        a.createdAt.getTime() - b.createdAt.getTime()
    );

    const groupedMessages = new Map<string, Message[]>();

    sortedMessages.forEach(message => {
        const dateStr = formatDate(message.createdAt);
        if (!groupedMessages.has(dateStr)) {
            groupedMessages.set(dateStr, []);
        }
        groupedMessages.get(dateStr)?.push(message);
    });

    messagesByDate.value = Array.from(groupedMessages.entries()).map(([date, msgs]) => ({
        date,
        messages: msgs
    }));
}, { deep: true });

onMounted(checkCookieAndFetchData);
</script>

<template>
    <h1 v-if="loading">Share.vodka</h1>
    <h1 v-else>{{ room.name }}</h1>
    <div v-if="loading">Loading messages...</div>
    <template v-else>
        <p>Room ID: {{ room.room_id }}</p>
        <div class="messages">
            <div v-for="group in messagesByDate" :key="group.date" class="message-group">
                <div class="message-group-date">{{ formatDisplayDate(new Date(group.messages[0].createdAt)) }}</div>
                <div class="message-group-messages">
                    <div v-for="(message, index) in group.messages" :key="message.message_id" class="message">
                        <div class="message-content" @click="copyToClipboard(message.content)">{{ message.content }}</div>
                        <div class="message-timestamp">{{ `${message.updatedAt.getHours().toString().padStart(2, '0')}:${message.updatedAt.getMinutes().toString().padStart(2, '0')}` }}</div>
                    </div>
                </div>
            </div>
        </div>
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
    max-height: 50vh;
    overflow-y: auto;
    padding: 15px;
    border: 1px solid base.$color-highlight-alternative;
    border-radius: 30px;
    box-shadow: 0 0 10px base.$color-darker-highlight-alternative;

    .message-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100% - 30px);
        margin: 15px;
        border-top: 1px solid base.$color-darker-highlight-alternative;

        &:first-child {
            border-top: none;
            margin-top: 0;
        }

        .message-group-date {
            font-weight: bold;
            margin: 10px 0;
        }

        .message-group-messages {
            display: flex;
            flex-direction: column;
            align-items: center;

            .message {
                display: flex;
                flex-direction: row;
                transition: all 0.2s ease-in-out;
                vertical-align: middle;
                margin-bottom: 10px;

                &:last-child {
                    margin-bottom: 0;
                }

                .message-content {
                    padding: 5px 10px;
                    align-items: center;
                    width: fit-content;
                    min-width: 200px;
                    border: 1px solid base.$color-highlight-alternative;
                    border-radius: 10px;

                    &:hover {
                        background-color: base.$color-lighter-background;
                        cursor: pointer;
                        box-shadow: 0 0 10px base.$color-darker-highlight-alternative;
                    }
                }

                .message-timestamp {
                    margin-left: 10px;
                    align-content: center;
                    font-family: monospace;
                    font-size: 0.8em;
                }
            }
        }
    }
}
</style>
