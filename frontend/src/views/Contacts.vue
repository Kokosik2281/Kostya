<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Заголовок -->
        <h1 class="text-4xl font-bold text-center mb-12 relative">
            <span class="relative inline-block">
                Контакты
                <span class="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
            </span>
        </h1>
  
        <!-- Основной контент -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Левая колонка -->
            <div>
                <!-- Контактная информация -->
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 class="text-2xl font-semibold mb-6 text-blue-700">Как нас найти</h2>
                    
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-medium text-lg mb-1">Адрес</h3>
                                <p class="text-gray-600">г. Москва, ул. Музыкальная, д. 12, 3 этаж</p>
                                <p class="text-gray-500 text-sm mt-1">Вход со стороны двора, код домофона 145</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-medium text-lg mb-1">Телефон</h3>
                                <p class="text-gray-600">+7 (495) 123-45-67</p>
                                <p class="text-gray-500 text-sm mt-1">Пн-Пт с 10:00 до 20:00</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-medium text-lg mb-1">Email</h3>
                                <p class="text-gray-600">info@akkord-music.ru</p>
                                <p class="text-gray-500 text-sm mt-1">Для записи и вопросов</p>
                            </div>
                        </div>
                    </div>
                </div>
  
                <!-- Часы работы -->
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 class="text-2xl font-semibold mb-6 text-blue-700">Часы работы</h2>
                    
                    <div class="space-y-3">
                        <div v-for="(hour, index) in workingHours" :key="index" class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <span class="font-medium">{{ hour.day }}</span>
                            <span class="text-gray-600">{{ hour.time }}</span>
                        </div>
                    </div>
                </div>
  
                <!-- Форма обратной связи -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-6 text-blue-700">Записаться на пробный урок</h2>
                    
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Имя ребёнка *</label>
                            <input 
                                type="text" 
                                id="name" 
                                v-model="form.name"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                            >
                        </div>
                        
                        <div>
                            <label for="age" class="block text-sm font-medium text-gray-700 mb-1">Возраст *</label>
                            <input 
                                type="number" 
                                id="age" 
                                v-model="form.age"
                                min="3"
                                max="99"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                            >
                        </div>
                        
                        <div>
                            <label for="instrument" class="block text-sm font-medium text-gray-700 mb-1">Интересующий инструмент</label>
                            <select
                                id="instrument"
                                v-model="form.instrument"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="">Выберите инструмент</option>
                                <option v-for="(inst, index) in instruments" :key="index" :value="inst">{{ inst }}</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="parent" class="block text-sm font-medium text-gray-700 mb-1">Имя родителя *</label>
                            <input 
                                type="text" 
                                id="parent" 
                                v-model="form.parent"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                            >
                        </div>
                        
                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                v-model="form.phone"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                required
                            >
                        </div>
                        
                        <div class="flex items-center">
                            <input 
                                type="checkbox" 
                                id="consent" 
                                v-model="form.consent"
                                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                required
                            >
                            <label for="consent" class="ml-2 block text-sm text-gray-700">
                                Я согласен на обработку персональных данных
                            </label>
                        </div>
                        
                        <button 
                            type="submit" 
                            class="btn-blue w-full py-3 px-4 text-lg font-medium"
                            :disabled="isSubmitting"
                        >
                            <span v-if="!isSubmitting">Отправить заявку</span>
                            <span v-else class="flex items-center justify-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Отправка...
                            </span>
                        </button>
                    </form>
                </div>
            </div>
  
            <!-- Правая колонка -->
            <div>
                <!-- Карта -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8 h-96">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.372951144276!2d37.61755431593095!3d55.75581798055371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a738fa419%3A0x7c347d506b52311f!2sRed%20Square!5e0!3m2!1sen!2sru!4v1623418257717!5m2!1sen!2sru" 
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
  
                <!-- Галерея -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h2 class="text-2xl font-semibold mb-6 text-blue-700">Наша школа</h2>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div 
                            v-for="(image, index) in schoolImages" 
                            :key="index"
                            class="relative overflow-hidden rounded-lg cursor-pointer group"
                            @click="openLightbox(index)"
                        >
                            <img 
                                :src="image" 
                                :alt="'Школа ' + (index + 1)" 
                                class="w-full h-40 object-cover transition duration-500 group-hover:scale-110"
                            >
                            <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10v4h4v-4h-4z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
  
                <!-- Социальные сети -->
                <div class="bg-white rounded-xl shadow-md p-6 mt-8">
                    <h2 class="text-2xl font-semibold mb-6 text-blue-700">Мы в соцсетях</h2>
                    
                    <div class="flex space-x-4">
                        <a href="#" class="social-icon bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                            </svg>
                        </a>
                        <a href="#" class="social-icon bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                            </svg>
                        </a>
                        <a href="#" class="social-icon bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
  
        <!-- Лайтбокс для галереи -->
        <div 
            v-if="lightboxOpen"
            class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            @click.self="closeLightbox"
        >
            <button 
                @click="closeLightbox"
                class="absolute top-4 right-4 text-white hover:text-blue-300 transition"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            
            <button 
                @click.stop="prevImage"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition p-2"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            
            <div class="max-w-4xl w-full">
                <img 
                    :src="schoolImages[currentImageIndex]" 
                    :alt="'Школа ' + (currentImageIndex + 1)" 
                    class="w-full max-h-screen object-contain"
                >
            </div>
            
            <button 
                @click.stop="nextImage"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-300 transition p-2"
            >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
            
            <div class="absolute bottom-4 left-0 right-0 text-center text-white">
                {{ currentImageIndex + 1 }} / {{ schoolImages.length }}
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            workingHours: [
                { day: "Понедельник - Пятница", time: "10:00 - 20:00" },
                { day: "Суббота", time: "11:00 - 18:00" },
                { day: "Воскресенье", time: "Выходной" }
            ],
            schoolImages: [
                "/images/school1.jpg",
                "/images/school2.jpg",
                "/images/school3.jpg",
                "/images/school4.jpg",
                "/images/school5.jpg",
                "/images/school6.jpg"
            ],
            instruments: [
                "Фортепиано",
                "Гитара",
                "Скрипка",
                "Виолончель",
                "Флейта",
                "Саксофон",
                "Труба",
                "Ударные",
                "Вокал",
                "Сольфеджио"
            ],
            form: {
                name: "",
                age: "",
                instrument: "",
                parent: "",
                phone: "",
                consent: false
            },
            isSubmitting: false,
            lightboxOpen: false,
            currentImageIndex: 0
        };
    },
    methods: {
        submitForm() {
            this.isSubmitting = true;
            // Здесь будет логика отправки формы
            setTimeout(() => {
                this.isSubmitting = false;
                alert("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
                this.form = {
                    name: "",
                    age: "",
                    instrument: "",
                    parent: "",
                    phone: "",
                    consent: false
                };
            }, 1500);
        },
        openLightbox(index) {
            this.currentImageIndex = index;
            this.lightboxOpen = true;
            document.body.style.overflow = "hidden";
        },
        closeLightbox() {
            this.lightboxOpen = false;
            document.body.style.overflow = "auto";
        },
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.schoolImages.length) % this.schoolImages.length;
        },
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.schoolImages.length;
        }
    }
  };
  </script>
  
  <style scoped>
  .btn-blue {
      @apply bg-blue-600 hover:bg-blue-700 text-white rounded transition;
  }
  
  .social-icon {
      @apply w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300;
  }
  
  input:focus, textarea:focus, select:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  </style>