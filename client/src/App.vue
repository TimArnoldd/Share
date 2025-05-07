<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted, provide } from 'vue';
import { getTokenFromCookie } from './helpers/cookie';

const tokenExists = ref(false);

const toggleHamburgerMenu = () => {
    document.getElementById('navigation')?.classList.toggle('expanded');
    document.getElementsByTagName('body')[0].classList.toggle('no-scroll');
}

const disableHamburgerMenu = () => {
    document.getElementById('navigation')?.classList.remove('expanded');
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
}

function checkCookie() {
    const token = getTokenFromCookie();
    tokenExists.value = !!token;
}

onMounted(checkCookie);
provide('checkCookie', checkCookie);
</script>

<template>
    <div class="header-wrapper">
        <header>
            <RouterLink to="/" @click="disableHamburgerMenu">
                <img alt="Logo" class="logo" src="/logo.svg" />
            </RouterLink>
            <nav id="navigation">
                <div class="hamburger-menu">
                    <span class="menu" @click="toggleHamburgerMenu">
                        <span class="hamburger"></span>
                    </span>
                </div>
                <div class="nav-links">
                    <template v-if="tokenExists">
                        <RouterLink to="/chat" @click="disableHamburgerMenu">Chat</RouterLink>
                    </template>
                    <RouterLink to="/create-room" @click="disableHamburgerMenu">Create Room</RouterLink>
                    <RouterLink to="/set-token" @click="disableHamburgerMenu">Set Token</RouterLink>
                </div>
            </nav>
        </header>
    </div>

    <main>
        <RouterView />
    </main>

    <div class="footer-wrapper">
        <footer>
            <div class="footer-infos">
                Share.vodka – Easily share stuff between your devices
            </div>
            <div class="footer-links">
                <ul>
                    <li>
                        <RouterLink to="/about" @click="disableHamburgerMenu">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about" @click="disableHamburgerMenu">About</RouterLink>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
</template>
