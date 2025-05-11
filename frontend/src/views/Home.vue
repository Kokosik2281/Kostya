<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Герой секция -->
        <section class="hero bg-gradient-to-r from-blue-600 to-blue-700 text-black rounded-xl shadow-lg p-8 mb-12 relative overflow-hidden">
            <div class="relative z-10 max-w-2xl">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Добро пожаловать в музыкальную школу "Аккорд"!</h1>
                <p class="text-xl mb-6">Раскрываем таланты и дарим радость музыки с 2005 года</p>
                <div class="flex flex-wrap gap-4">
                    <router-link to="/about" class="btn-blue px-6 py-3 font-medium">
                        О школе
                    </router-link>
                    <router-link to="/students" class="btn-blue px-6 py-3 font-medium">
                        Наши ученики
                    </router-link>
                    <router-link to="/contacts" class="btn-blue px-6 py-3 font-medium">
                        Контакты
                    </router-link>
                </div>
            </div>
            <div class="absolute -right-20 -bottom-20 opacity-20 z-0">
                <svg class="w-64 h-64" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"></path>
                </svg>
            </div>
        </section>
  
        <!-- Направления обучения -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Направления обучения
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(course, index) in courses" :key="index" class="card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div class="relative overflow-hidden h-48">
                        <img :src="course.image" :alt="course.title" class="w-full h-full object-cover transition duration-500 hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2 text-blue-700">{{ course.title }}</h3>
                        <p class="text-gray-600 mb-4">{{ course.description }}</p>
                        <div class="flex justify-between items-center">
                            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{{ course.age }}</span>
                            <span class="text-blue-600 font-medium">{{ course.price }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  
        <!-- Наши преимущества -->
        <section class="mb-16 bg-blue-50 rounded-xl p-8">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Почему выбирают нас?
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(feature, index) in features" :key="index" class="feature-card bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
                    <div class="flex items-center mb-4">
                        <div class="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                            <component :is="feature.icon" class="w-6 h-6 text-blue-600"></component>
                        </div>
                        <h3 class="ml-3 text-lg font-medium text-gray-900">{{ feature.title }}</h3>
                    </div>
                    <p class="text-gray-600">{{ feature.description }}</p>
                </div>
            </div>
        </section>
  
        <!-- Отзывы -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Отзывы родителей
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <div class="flex items-center mb-4">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span class="text-blue-600 font-medium">{{ testimonial.initials }}</span>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-gray-900">{{ testimonial.name }}</h3>
                            <p class="text-sm text-gray-500">{{ testimonial.child }}</p>
                            <div class="flex text-yellow-400 mt-1">
                                <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="{ 'text-gray-300': i > testimonial.rating }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p class="italic text-gray-600">"{{ testimonial.text }}"</p>
                </div>
            </div>
        </section>
  
        <!-- Концерты и достижения -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 relative">
                <span class="relative inline-block">
                    Наши достижения
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </span>
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="(achievement, index) in achievements" :key="index" class="bg-white p-6 rounded-lg shadow text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">{{ achievement.value }}</div>
                    <div class="text-sm uppercase tracking-wider text-blue-500">{{ achievement.label }}</div>
                </div>
            </div>
        </section>
    </div>
  </template>
  
  <script>
  import { 
    CheckIcon, 
    UserGroupIcon,
    AcademicCapIcon,
    MusicalNoteIcon,
    TrophyIcon
  } from '@heroicons/vue/24/outline'
  
  export default {
    components: {
        CheckIcon,
        UserGroupIcon,
        AcademicCapIcon,
        MusicalNoteIcon,
        TrophyIcon
    },
    data() {
        return {
            courses: [
                {
                    title: "Фортепиано",
                    description: "Индивидуальные уроки игры на фортепиано для всех возрастов",
                    image: "/images/piano.jpg",
                    age: "С 5 лет",
                    price: "2500₽/урок"
                },
                {
                    title: "Гитара",
                    description: "Обучение классической и эстрадной гитаре",
                    image: "/images/guitar.jpg",
                    age: "С 7 лет",
                    price: "2000₽/урок"
                },
                {
                    title: "Вокал",
                    description: "Постановка голоса и развитие музыкального слуха",
                    image: "/images/vocal.jpg",
                    age: "С 6 лет",
                    price: "2200₽/урок"
                },
                {
                    title: "Скрипка",
                    description: "Классическое обучение игре на скрипке",
                    image: "/images/violin.jpg",
                    age: "С 6 лет",
                    price: "2800₽/урок"
                },
                {
                    title: "Барабаны",
                    description: "Развитие чувства ритма и техники игры",
                    image: "/images/drums.jpg",
                    age: "С 8 лет",
                    price: "2300₽/урок"
                },
                {
                    title: "Сольфеджио",
                    description: "Основы музыкальной грамоты и теории",
                    image: "/images/solfeggio.jpg",
                    age: "С 6 лет",
                    price: "1800₽/урок"
                }
            ],
            features: [
                {
                    title: "Профессиональные педагоги",
                    description: "Все преподаватели - действующие музыканты с консерваторским образованием",
                    icon: "AcademicCapIcon"
                },
                {
                    title: "Индивидуальный подход",
                    description: "Программа обучения подбирается под каждого ученика",
                    icon: "UserGroupIcon"
                },
                {
                    title: "Концертная практика",
                    description: "Регулярные выступления на сцене и конкурсах",
                    icon: "MusicalNoteIcon"
                },
                {
                    title: "Гибкий график",
                    description: "Возможность подобрать удобное время занятий",
                    icon: "CheckIcon"
                },
                {
                    title: "Атмосфера творчества",
                    description: "Уютные классы с качественными инструментами",
                    icon: "MusicalNoteIcon"
                },
                {
                    title: "Достижения учеников",
                    description: "Наши ученики - победители международных конкурсов",
                    icon: "TrophyIcon"
                }
            ],
            testimonials: [
                {
                    name: "Ольга Смирнова",
                    initials: "ОС",
                    child: "Дочь Мария, 9 лет",
                    text: "Моя дочь за год обучения сделала огромный прогресс! Спасибо педагогу за терпение и профессионализм.",
                    rating: 5
                },
                {
                    name: "Андрей Петров",
                    initials: "АП",
                    child: "Сын Иван, 12 лет",
                    text: "Отличная школа! Сын с удовольствием ходит на занятия гитарой уже третий год.",
                    rating: 5
                },
                {
                    name: "Елена Козлова",
                    initials: "ЕК",
                    child: "Дочь София, 7 лет",
                    text: "Прекрасные преподаватели, которые умеют найти подход к детям. Рекомендую!",
                    rating: 4
                }
            ],
            achievements: [
                { value: "18 лет", label: "Опыта работы" },
                { value: "200+", label: "Учеников" },
                { value: "50+", label: "Концертов в год" },
                { value: "30+", label: "Побед в конкурсах" }
            ]
        };
    }
  };
  </script>
  
  <style scoped>
  .hero {
    background-image: url('/images/music-school-bg.jpg');
    background-size: cover;
    background-position: center;
    background-blend-mode: multiply;
  }
  
  .btn-blue {
      @apply bg-blue-600 hover:bg-blue-700 text-white rounded transition;
  }
  
  .btn-outline-blue {
      @apply border border-blue-300 hover:bg-blue-50/10 text-white rounded transition;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  </style>