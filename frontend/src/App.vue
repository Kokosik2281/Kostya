<template>
  <div class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-grow">
          <router-view />
      </main>
      <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Header, Footer }
};
</script>

<style scoped>
/* Основные цвета темы */
:root {
--primary-blue: #1976d2;
--primary-blue-light: #2196f3;
--primary-blue-dark: #0d47a1;
--secondary-blue: #64b5f6;
--accent-blue: #90caf9;
--light-bg: #e3f2fd;
--dark-text: #263238;
--light-text: #eceff1;
}

body {
font-family: 'Roboto', sans-serif;
background-color: #f9f9f9;
color: var(--dark-text);
line-height: 1.6;
}

/* Глобальные анимации */
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

.fade-in {
animation: fadeIn 0.5s ease-in;
}

/* Кастомные кнопки */
.btn-blue {
background-color: var(--primary-blue);
color: white;
padding: 0.6rem 1.2rem;
border-radius: 4px;
font-weight: 500;
transition: all 0.3s ease;
border: none;
cursor: pointer;
}

.btn-blue:hover {
background-color: var(--primary-blue-dark);
transform: translateY(-2px);
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-outline-blue {
background-color: transparent;
color: var(--primary-blue);
border: 2px solid var(--primary-blue);
padding: 0.6rem 1.2rem;
border-radius: 4px;
font-weight: 500;
transition: all 0.3s ease;
}

.btn-outline-blue:hover {
background-color: var(--primary-blue);
color: white;
}

/* Стили для таблиц */
.table-container {
overflow-x: auto;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
border-radius: 0.5rem;
}

.table {
width: 100%;
text-align: left;
color: #374151;
}

.table thead {
background-color: #1976d2;
color: white;
}

.table th {
padding: 1rem 1.5rem;
font-weight: 500;
}

.table tbody tr {
background-color: white;
border-bottom: 1px solid #e5e7eb;
transition: background-color 0.3s;
}

.table tbody tr:hover {
background-color: #e3f2fd;
}

.table td {
padding: 1rem 1.5rem;
}

.table-actions {
display: flex;
gap: 0.5rem;
}

/* Стили для кнопок в таблице */
.btn-table {
padding: 0.5rem 0.75rem;
border-radius: 0.25rem;
font-size: 0.875rem;
font-weight: 500;
transition: all 0.3s;
}

.btn-view {
background-color: #1976d2;
color: white;
}

.btn-view:hover {
background-color: #1565c0;
}

.btn-edit {
background-color: #ffb300;
color: white;
}

.btn-edit:hover {
background-color: #ffa000;
}

.btn-delete {
background-color: #e53935;
color: white;
}

.btn-delete:hover {
background-color: #d32f2f;
}

.btn-add {
background-color: #1976d2;
color: white;
padding: 0.5rem 1rem;
border-radius: 0.375rem;
transition: all 0.3s;
}

.btn-add:hover {
background-color: #1565c0;
}
</style>