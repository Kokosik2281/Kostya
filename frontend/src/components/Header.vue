<template>
    <header class="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg">
        <nav class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <svg class="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"></path>
                    </svg>
                    <h1 class="text-2xl font-bold tracking-tight">Музыкальная школа <span class="text-blue-200">"Аккорд"</span></h1>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <router-link 
                        v-for="link in links" 
                        :key="link.path"
                        :to="link.path" 
                        class="nav-link relative group"
                        :class="{ 'font-semibold': $route.path === link.path }"
                    >
                        {{ link.name }}
                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all group-hover:w-full"></span>
                    </router-link>
                    
                    <template v-if="!isAuthenticated">
                        <router-link to="/login" class="btn-outline-blue px-4 py-2 text-sm">
                            Вход
                        </router-link>
                        <router-link to="/register" class="btn-blue px-4 py-2 text-sm">
                            Регистрация
                        </router-link>
                    </template>
                    
                    <template v-else>
                        <span class="text-sm bg-blue-600 px-3 py-1 rounded-full">{{ userRole }}</span>
                        <button @click="logout" class="flex items-center text-sm hover:text-blue-200 transition">
                            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Выйти
                        </button>
                    </template>
                </div>
                
                <!-- Мобильное меню -->
                <button class="md:hidden focus:outline-none" @click="isMobileMenuOpen = !isMobileMenuOpen">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Мобильное меню (выпадающее) -->
            <div v-if="isMobileMenuOpen" class="md:hidden mt-4 space-y-3 pb-3">
                <router-link 
                    v-for="link in links" 
                    :key="link.path"
                    :to="link.path" 
                    class="block px-3 py-2 rounded hover:bg-blue-600 transition"
                    @click="isMobileMenuOpen = false"
                >
                    {{ link.name }}
                </router-link>
                
                <div v-if="!isAuthenticated" class="pt-2 border-t border-blue-600">
                    <router-link 
                        to="/login" 
                        class="block px-3 py-2 rounded hover:bg-blue-600 transition mb-2"
                        @click="isMobileMenuOpen = false"
                    >
                        Вход
                    </router-link>
                    <router-link 
                        to="/register" 
                        class="block btn-blue w-full text-center"
                        @click="isMobileMenuOpen = false"
                    >
                        Регистрация
                    </router-link>
                </div>
                
                <div v-else class="pt-2 border-t border-blue-600">
                    <div class="px-3 py-2 text-sm">
                        Роль: <span class="font-medium">{{ userRole }}</span>
                    </div>
                    <button 
                        @click="logout" 
                        class="flex items-center w-full px-3 py-2 rounded hover:bg-blue-600 transition"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Выйти
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const isMobileMenuOpen = ref(false);

        const links = [
            { name: 'Главная', path: '/' },
            { name: 'О школе', path: '/about' },
            { name: 'Контакты', path: '/contacts' },
            { name: 'Ученики', path: '/students' },
            { name: 'Преподаватели', path: '/teachers' }
        ];

        const isAuthenticated = computed(() => store.getters.isAuthenticated);
        const userRole = computed(() => store.getters.userRole);

        const logout = () => {
            store.dispatch('logout');
            router.push('/login');
            isMobileMenuOpen.value = false;
        };

        return { 
            isAuthenticated, 
            userRole, 
            logout,
            links,
            isMobileMenuOpen
        };
    }
};
</script>

<style scoped>
.nav-link {
    @apply text-white hover:text-blue-200 transition-colors;
}

.router-link-active {
    @apply text-blue-200;
}

.btn-blue {
    @apply bg-blue-600 hover:bg-blue-700 text-white rounded transition;
}

.btn-outline-blue {
    @apply border border-blue-300 hover:bg-blue-50/10 text-white rounded transition;
}
</style>