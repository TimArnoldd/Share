<script setup lang="ts">
import { useBackend } from '@/helpers/backend';
import { getTokenFromCookie, setTokenInCookie } from '@/helpers/cookie';
import { toastError, toastSuccess } from '@/helpers/toast';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'

const token = ref('');
const checkCookie = inject('checkCookie') as Function;

const router = useRouter();
const route = useRoute()
const backend = useBackend();

async function setToken() {
    try {
        if (!token.value) {
            toastError('Please enter a token.');
            return;
        }
        const existingToken = getTokenFromCookie();
        setTokenInCookie(token.value);
        await backend.get('/room').catch((error) => {
            setTokenInCookie(existingToken ? existingToken : '')
            if (error.response?.data)
                throw new Error('The room does not exist or the token is invalid.');
            throw new Error('An error occurred while checking the token.');
        });
        toastSuccess('Token successfully set!');
        checkCookie();
        router.push('/chat');
    } catch (error: any) {
        toastError('Error setting token', error.message);
        console.error('Error setting token:', error);
    }
}

if (route.params.token) {
    token.value = route.params.token as string;
    setToken()
}
</script>

<template>
    <h1>Set Token</h1>
    <input v-model="token" type="text" name="token" id="token">
    <br>
    <button style="margin-top: 30px;" @click="setToken">Set Token</button>
</template>