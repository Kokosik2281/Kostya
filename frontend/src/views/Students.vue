<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-blue-700">Студенты</h1>
            <button 
                v-if="isAdmin" 
                @click="showForm = true" 
                class="btn-add flex items-center"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Добавить студента
            </button>
        </div>

        <!-- Таблица студентов -->
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Email</th>
                        <th>Фото</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{ student.id }}</td>
                        <td>{{ student.first_name }}</td>
                        <td>{{ student.last_name }}</td>
                        <td>{{ student.email }}</td>
                        <td>
                            <img 
                                :src="getImageUrl(student.photo_file_name)" 
                                alt="Student" 
                                class="w-16 h-16 object-cover rounded"
                            />
                        </td>
                        <td>
                            <div class="table-actions">
                                <button 
                                    @click="viewStudent(student)"
                                    class="btn-view flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    Просмотр
                                </button>
                                <button 
                                    v-if="isAdmin" 
                                    @click="editStudent(student)"
                                    class="btn-edit flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Редактировать
                                </button>
                                <button 
                                    v-if="isAdmin" 
                                    @click="deleteStudent(student.id)"
                                    class="btn-delete flex items-center"
                                >
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Удалить
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Пагинация -->
        <div class="mt-6 flex justify-center items-center space-x-2">
            <button 
                :disabled="currentPage === 1" 
                @click="currentPage = 1"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                В начало
            </button>
            <button 
                :disabled="currentPage === 1" 
                @click="currentPage--"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                Назад
            </button>
            <button 
                v-for="page in displayedPages" 
                :key="page" 
                @click="currentPage = page" 
                :class="[
                    'px-4 py-1 rounded-lg transition',
                    currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                ]"
            >
                {{ page }}
            </button>
            <button 
                :disabled="currentPage === totalPages" 
                @click="currentPage++"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                Вперед
            </button>
            <button 
                :disabled="currentPage === totalPages" 
                @click="currentPage = totalPages"
                class="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
                В конец
            </button>
        </div>

        <!-- Форма добавления/редактирования -->
        <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded max-w-lg w-full">
                <h2 class="text-xl font-bold mb-4">{{ form.id ? 'Редактировать студента' : 'Добавить студента' }}</h2>
                <Form @submit="saveStudent">
                    <div class="grid grid-cols-1 gap-4">
                        <input v-model="form.first_name" type="text" placeholder="Имя" class="border p-2 rounded" required />
                        <input v-model="form.last_name" type="text" placeholder="Фамилия" class="border p-2 rounded" required />
                        <input v-model="form.email" type="email" placeholder="Email" class="border p-2 rounded" required />
                        <input v-model="form.phone" type="text" placeholder="Телефон" class="border p-2 rounded" />
                        <input v-model="form.date_of_birth" type="date" placeholder="Дата рождения" class="border p-2 rounded" required />
                        <input v-model="form.address" type="text" placeholder="Адрес" class="border p-2 rounded" />
                        <input v-model="form.city" type="text" placeholder="Город" class="border p-2 rounded" />
                        <input v-model="form.country" type="text" placeholder="Страна" class="border p-2 rounded" />
                        <input type="file" @change="handleFileChange" class="border p-2 rounded" />
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
                            Сохранить
                        </button>
                        <button @click="showForm = false" class="bg-gray-500 text-white px-4 py-2 rounded">
                            Отмена
                        </button>
                    </div>
                </Form>
            </div>
        </div>

        <!-- Модальное окно просмотра -->
        <div v-if="showView" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded max-w-lg w-full">
                <h2 class="text-xl font-bold mb-4">Просмотр студента</h2>
                <div class="grid grid-cols-1 gap-4">
                    <p><strong>ID:</strong> {{ viewStudentData.id }}</p>
                    <p><strong>Имя:</strong> {{ viewStudentData.first_name }}</p>
                    <p><strong>Фамилия:</strong> {{ viewStudentData.last_name }}</p>
                    <p><strong>Email:</strong> {{ viewStudentData.email }}</p>
                    <p><strong>Телефон:</strong> {{ viewStudentData.phone || 'Не указан' }}</p>
                    <p><strong>Дата рождения:</strong> {{ formatDate(viewStudentData.date_of_birth) }}</p>
                    <p><strong>Адрес:</strong> {{ viewStudentData.address || 'Не указан' }}</p>
                    <p><strong>Город:</strong> {{ viewStudentData.city || 'Не указан' }}</p>
                    <p><strong>Страна:</strong> {{ viewStudentData.country || 'Не указана' }}</p>
                    <img :src="getImageUrl(viewStudentData.photo_file_name)" alt="Student"
                        class="w-32 h-32 object-cover rounded" />
                </div>
                <button @click="showView = false" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import Table from '../components/Table.vue';
import Form from '../components/Form.vue';

export default {
    components: { Table, Form },
    setup() {
        const store = useStore();
        const students = ref([]);
        const currentPage = ref(1);
        const limit = 10;
        const total = ref(0);
        const showForm = ref(false);
        const showView = ref(false);
        const viewStudentData = ref({});
        const form = ref({
            id: null,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            date_of_birth: '',
            address: '',
            city: '',
            country: '',
            photo_file_name: null
        });
        const file = ref(null);
        const isAdmin = computed(() => store.getters.userRole === 'admin');
        const totalPages = computed(() => Math.ceil(total.value / limit));

        const displayedPages = computed(() => {
            const maxPagesToShow = 5;
            const pages = [];
            const half = Math.floor(maxPagesToShow / 2);
            let start = Math.max(1, currentPage.value - half);
            let end = Math.min(totalPages.value, start + maxPagesToShow - 1);
            if (end - start + 1 < maxPagesToShow) {
                start = Math.max(1, end - maxPagesToShow + 1);
            }
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        });

        const fetchStudents = async () => {
            try {
                const response = await axios.get(`/api/students?page=${currentPage.value}&limit=${limit}`);
                students.value = response.data.students;
                total.value = response.data.total;
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };

        const saveStudent = async () => {
            const formData = new FormData();
            formData.append('first_name', form.value.first_name);
            formData.append('last_name', form.value.last_name);
            formData.append('email', form.value.email);
            formData.append('phone', form.value.phone);
            formData.append('date_of_birth', form.value.date_of_birth);
            formData.append('address', form.value.address);
            formData.append('city', form.value.city);
            formData.append('country', form.value.country);
            if (file.value) formData.append('photo', file.value);
            else if (form.value.photo_file_name) formData.append('photo', form.value.photo_file_name);

            try {
                if (form.value.id) {
                    await axios.put(`/api/students/${form.value.id}`, formData);
                } else {
                    await axios.post(`/api/students`, formData);
                }
                fetchStudents();
                resetForm();
            } catch (error) {
                console.error('Failed to save student:', error);
            }
        };

        const editStudent = (student) => {
            form.value = { ...student };
            file.value = null;
            showForm.value = true;
        };

        const deleteStudent = async (id) => {
            if (confirm('Удалить студента?')) {
                try {
                    await axios.delete(`/api/students/${id}`);
                    fetchStudents();
                } catch (error) {
                    console.error('Failed to delete student:', error);
                }
            }
        };

        const viewStudent = (student) => {
            viewStudentData.value = { ...student };
            showView.value = true;
        };

        const resetForm = () => {
            form.value = {
                id: null,
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                date_of_birth: '',
                address: '',
                city: '',
                country: '',
                photo_file_name: null
            };
            file.value = null;
            showForm.value = false;
        };

        const handleFileChange = (event) => {
            file.value = event.target.files[0];
        };

        const getImageUrl = (image) => {
            return image ? `${image}` : '/images/placeholder.jpg';
        };

        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString();
        };

        watch(currentPage, fetchStudents, { immediate: true });

        return {
            students,
            currentPage,
            totalPages,
            displayedPages,
            showForm,
            showView,
            viewStudentData,
            form,
            isAdmin,
            saveStudent,
            editStudent,
            deleteStudent,
            viewStudent,
            handleFileChange,
            getImageUrl,
            formatDate
        };
    }
};
</script>
