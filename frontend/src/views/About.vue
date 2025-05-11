<template>
    <div class="container mx-auto px-4 py-8">
        <!-- О школе -->
        <section class="mb-16">
            <div class="flex flex-col md:flex-row items-center gap-8">
                <div class="md:w-1/2">
                    <h1 class="text-4xl font-bold mb-6 text-blue-700">О музыкальной школе "Аккорд"</h1>
                    <p class="text-lg mb-4">
                        Основанная в 2005 году, наша школа стала домом для сотен талантливых музыкантов. Мы гордимся тем, что создаем пространство, где каждый может раскрыть свой музыкальный потенциал.
                    </p>
                    <p class="text-lg mb-6">
                        Наши выпускники продолжают обучение в ведущих музыкальных вузах страны и успешно выступают на международных конкурсах.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <router-link to="/contacts" class="btn-blue px-6 py-3">
                            Записаться на пробный урок
                        </router-link>
                        <router-link to="/teachers" class="btn-outline-blue px-6 py-3">
                            Наши преподаватели
                        </router-link>
                    </div>
                </div>
                <div class="md:w-1/2">
                    <img src="/images/about-school.jpg" alt="Наша школа" class="rounded-xl shadow-lg w-full h-auto">
                </div>
            </div>
        </section>
  
        <!-- Наша миссия -->
        <section class="mb-16 bg-blue-50 rounded-xl p-8">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Наша миссия
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="max-w-3xl mx-auto text-center">
                <p class="text-lg mb-6">
                    Мы верим, что музыка - это универсальный язык, способный объединять людей. Наша цель - сделать качественное музыкальное образование доступным для всех возрастов и уровней подготовки.
                </p>
                <p class="text-lg">
                    Каждый урок в нашей школе - это не просто обучение технике, но и воспитание любви к музыке, развитие творческого мышления и артистической смелости.
                </p>
            </div>
        </section>
  
        <!-- Наши принципы -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Наши принципы
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="(principle, index) in principles" :key="index" class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition flex items-start">
                    <div class="bg-blue-100 p-2 rounded-full mr-4">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-2">{{ principle.title }}</h3>
                        <p class="text-gray-600">{{ principle.description }}</p>
                    </div>
                </div>
            </div>
        </section>
  
        <!-- Наша команда -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Наши педагоги
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(teacher, index) in teachers" :key="index" class="team-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <div class="relative h-64 overflow-hidden">
                        <img :src="teacher.image" :alt="teacher.name" class="w-full h-full object-cover transition duration-500 hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-1">{{ teacher.name }}</h3>
                        <p class="text-blue-600 font-medium mb-2">{{ teacher.specialization }}</p>
                        <p class="text-gray-600 text-sm mb-4">{{ teacher.experience }}</p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="(skill, i) in teacher.skills" :key="i" class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  
        <!-- История школы -->
        <section class="mb-16 bg-blue-50 rounded-xl p-8">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    История школы
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="max-w-4xl mx-auto">
                <div class="space-y-8">
                    <div v-for="(event, index) in history" :key="index" class="flex">
                        <div class="flex-shrink-0 mr-4">
                            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold">
                                {{ event.year }}
                            </div>
                        </div>
                        <div class="flex-grow">
                            <h3 class="text-lg font-semibold mb-2">{{ event.title }}</h3>
                            <p class="text-gray-600">{{ event.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            principles: [
                {
                    title: "Индивидуальный подход",
                    description: "Каждый ученик уникален, и мы подбираем программу под его способности и цели"
                },
                {
                    title: "Профессионализм",
                    description: "Все наши педагоги - дипломированные специалисты с консерваторским образованием"
                },
                {
                    title: "Любовь к музыке",
                    description: "Мы учим не только технике, но и пониманию и чувствованию музыки"
                },
                {
                    title: "Творческая свобода",
                    description: "Поощряем эксперименты и поиск собственного музыкального стиля"
                },
                {
                    title: "Регулярные выступления",
                    description: "Ученики выступают на концертах несколько раз в год"
                },
                {
                    title: "Комфортная атмосфера",
                    description: "Создаем дружелюбную среду без излишнего давления"
                }
            ],
            teachers: [
                {
                    name: "Елена Петрова",
                    specialization: "Фортепиано",
                    experience: "Преподает 15 лет, выпускница Московской консерватории",
                    skills: ["Классика", "Джаз", "Импровизация"],
                    image: "/images/teacher1.jpg"
                },
                {
                    name: "Алексей Смирнов",
                    specialization: "Гитара",
                    experience: "Преподает 12 лет, участник международных конкурсов",
                    skills: ["Классика", "Фламенко", "Акустика"],
                    image: "/images/teacher2.jpg"
                },
                {
                    name: "Ольга Иванова",
                    specialization: "Вокал",
                    experience: "Преподает 10 лет, солистка камерного хора",
                    skills: ["Академический", "Эстрадный", "Джазовый"],
                    image: "/images/teacher3.jpg"
                },
                {
                    name: "Олег Скриченко",
                    specialization: "Скрипка",
                    experience: "Преподает 5 лет, скрипач мировой эстрады",
                    skills: ["Академический", "Эстрадный", "Джазовый"],
                    image: "/images/teacher4.png"
                },
                {
                    name: "Наталья Звездина",
                    specialization: "Барабаны",
                    experience: "Преподает 15 лет, Барабанщица известной группы",
                    skills: ["Академический", "Эстрадный", "Джазовый"],
                    image: "/images/teacher5.jpg"
                },
                {
                    name: "Костя Карелин",
                    specialization: "Директор",
                    experience: "Не преподает, смешной",
                    skills: ["Здоровяк", "Качок", "Сильный"],
                    image: "/images/teacher6.png"
                }
            ],
            history: [
                {
                    year: "2005",
                    title: "Основание школы",
                    description: "Открытие первой студии с тремя классами и пятью преподавателями"
                },
                {
                    year: "2010",
                    title: "Первые победы",
                    description: "Наши ученики впервые заняли призовые места на городских конкурсах"
                },
                {
                    year: "2015",
                    title: "Расширение",
                    description: "Переезд в новое просторное здание с концертным залом"
                },
                {
                    year: "2020",
                    title: "Онлайн-обучение",
                    description: "Запуск дистанционных программ и мастер-классов"
                },
                {
                    year: "2023",
                    title: "Международное признание",
                    description: "Наши ученики победили на конкурсе в Вене"
                }
            ]
        };
    }
  };
  </script>
  
  <style scoped>
  .btn-blue {
      @apply bg-blue-600 hover:bg-blue-700 text-white rounded transition;
  }
  
  .btn-outline-blue {
      @apply border border-blue-600 text-blue-600 hover:bg-blue-50 rounded transition;
  }
  
  .team-card {
    transition: all 0.3s ease;
  }
  
  .team-card:hover {
    transform: translateY(-5px);
  }
  </style>