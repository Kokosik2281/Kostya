const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Настройка подключения к MySQL
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Расширенные массивы для генерации данных студентов
const firstNames = [
    'Анна', 'Мария', 'Екатерина', 'София', 'Дарья', 'Алина', 'Виктория', 'Полина', 'Александра', 'Елена',
    'Алексей', 'Дмитрий', 'Иван', 'Михаил', 'Артем', 'Андрей', 'Сергей', 'Никита', 'Кирилл', 'Максим',
    'Ольга', 'Татьяна', 'Наталья', 'Юлия', 'Анастасия', 'Евгения', 'Ирина', 'Марина', 'Светлана', 'Людмила',
    'Павел', 'Николай', 'Владимир', 'Константин', 'Роман', 'Антон', 'Денис', 'Георгий', 'Станислав', 'Вадим'
];

const lastNames = [
    'Иванова', 'Петрова', 'Смирнова', 'Кузнецова', 'Соколова', 'Попова', 'Лебедева', 'Козлова', 'Новикова', 'Морозова',
    'Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Соколов', 'Попов', 'Лебедев', 'Козлов', 'Новиков', 'Морозов',
    'Васильева', 'Федорова', 'Волкова', 'Алексеева', 'Захарова', 'Семенова', 'Егорова', 'Павлова', 'Степанова', 'Николаева',
    'Васильев', 'Федоров', 'Волков', 'Алексеев', 'Захаров', 'Семенов', 'Егоров', 'Павлов', 'Степанов', 'Николаев'
];

const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Самара', 'Челябинск', 'Омск', 'Ростов-на-Дону'];
const countries = ['Россия', 'Беларусь', 'Казахстан', 'Армения', 'Азербайджан'];

// Массивы для генерации данных преподавателей
const teacherFirstNames = [
    'Ольга', 'Татьяна', 'Наталья', 'Елена', 'Светлана', 'Любовь', 'Галина', 'Валентина', 'Инна', 'Маргарита',
    'Сергей', 'Андрей', 'Павел', 'Николай', 'Владимир', 'Анатолий', 'Юрий', 'Борис', 'Геннадий', 'Валерий'
];

const teacherLastNames = [
    'Васильева', 'Федорова', 'Морозова', 'Волкова', 'Алексеева', 'Орлова', 'Тихонова', 'Андреева', 'Макарова', 'Зайцева',
    'Васильев', 'Федоров', 'Морозов', 'Волков', 'Алексеев', 'Орлов', 'Тихонов', 'Андреев', 'Макаров', 'Зайцев'
];

const departments = ['Фортепиано', 'Скрипка', 'Виолончель', 'Флейта', 'Кларнет', 'Саксофон', 'Труба', 'Гитара', 'Балалайка', 'Ударные', 'Вокал'];
const qualifications = ['Высшая', 'Первая', 'Вторая', 'Заслуженный артист', 'Народный артист', 'Кандидат искусствоведения'];

// Хранилище для использованных email
const usedEmails = new Set();

// Функция для генерации случайного элемента из массива
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Функция для генерации уникального email
const getUniqueEmail = (firstName, lastName) => {
    let email, attempt = 0;
    do {
        const suffix = attempt === 0 ? '' : attempt;
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${suffix}@music-school.ru`;
        attempt++;
    } while (usedEmails.has(email));
    
    usedEmails.add(email);
    return email;
};

// Функция для генерации случайного телефона
const getRandomPhone = () => `+79${Math.floor(100000000 + Math.random() * 900000000)}`;

// Функция для генерации случайной даты (студенты 6-18 лет)
const getRandomBirthDate = () => {
    const year = 2000 + Math.floor(Math.random() * 13); // 2000-2012
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month < 9 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
};

// Функция для генерации случайной даты найма (преподаватели)
const getRandomHireDate = () => {
    const year = 1990 + Math.floor(Math.random() * 30); // 1990-2020
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month < 9 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
};

// Основная функция для заполнения базы
async function populateDatabase() {
    try {
        // Заполнение таблицы students
        for (let i = 1; i <= 100; i++) {
            const firstName = getRandomItem(firstNames);
            const lastName = getRandomItem(lastNames);
            
            await db.query(
                'INSERT INTO students (first_name, last_name, email, phone, date_of_birth, address, city, country, photo_file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    firstName,
                    lastName,
                    getUniqueEmail(firstName, lastName),
                    getRandomPhone(),
                    getRandomBirthDate(),
                    `ул. ${getRandomItem(['Мира', 'Ленина', 'Гагарина', 'Пушкина', 'Чайковского'])}, ${Math.floor(Math.random() * 100) + 1}`,
                    getRandomItem(cities),
                    getRandomItem(countries),
                    '/uploads/placeholder.jpg'
                ]
            );
        }
        console.log('Inserted 100 students');

        // Заполнение таблицы teachers
        for (let i = 1; i <= 100; i++) {
            const firstName = getRandomItem(teacherFirstNames);
            const lastName = getRandomItem(teacherLastNames);
            
            await db.query(
                'INSERT INTO teachers (first_name, last_name, email, phone, hire_date, department, office_location, qualification, photo_file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    firstName,
                    lastName,
                    getUniqueEmail(firstName, lastName),
                    getRandomPhone(),
                    getRandomHireDate(),
                    getRandomItem(departments),
                    `Кабинет ${Math.floor(Math.random() * 20) + 1}`,
                    getRandomItem(qualifications),
                    '/uploads/placeholder.jpg'
                ]
            );
        }
        console.log('Inserted 100 teachers');

        // Закрытие соединения
        await db.end();
        console.log('Database population completed');
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

// Выполнение скрипта
populateDatabase();