const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

// Настройка CORS - только для API в development
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:8000' }));
}

app.use(express.json());

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: './Uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Подключение к базе данных
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000, // 10 секунд таймаут
    ssl: {
        rejectUnauthorized: false
    },
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.MYSQL_PASSWORD + '\0')
    }
});

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Регистрация
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            console.log('Email already exists:', email);
            return res.status(400).json({ error: 'Email already exists' });
        }

        await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, password, 'user']);
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Логин
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ error: 'User not found' });

        const user = users[0];
        if (password !== user.password) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// ==================== Студенты (Students) ====================

// Получить список студентов с пагинацией
app.get('/api/students', authenticateToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const [students] = await db.query('SELECT * FROM students LIMIT ? OFFSET ?', [limit, offset]);
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM students');
        const total = countResult[0].total;
        res.json({ students, total, page, limit });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Добавить студента
app.post('/api/students', authenticateToken, upload.single('photo'), async (req, res) => {
    const { first_name, last_name, email, phone, date_of_birth, address, city, country } = req.body;
    const photo_file_name = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.jpg';

    try {
        await db.query(
            'INSERT INTO students (first_name, last_name, email, phone, date_of_birth, address, city, country, photo_file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, phone, date_of_birth, address, city, country, photo_file_name]
        );
        res.status(201).json({ message: 'Student added' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Обновить студента
app.put('/api/students/:id', authenticateToken, upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, date_of_birth, address, city, country } = req.body;
    const photo_file_name = req.file ? `/uploads/${req.file.filename}` : req.body.photo_file_name;

    try {
        await db.query(
            'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?, address = ?, city = ?, country = ?, photo_file_name = ? WHERE id = ?',
            [first_name, last_name, email, phone, date_of_birth, address, city, country, photo_file_name, id]
        );
        res.json({ message: 'Student updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// Удалить студента
app.delete('/api/students/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM students WHERE id = ?', [id]);
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// ==================== Преподаватели (Teachers) ====================

// Получить список преподавателей с пагинацией
app.get('/api/teachers', authenticateToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const [teachers] = await db.query('SELECT * FROM teachers LIMIT ? OFFSET ?', [limit, offset]);
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM teachers');
        const total = countResult[0].total;
        res.json({ teachers, total, page, limit });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teachers' });
    }
});

// Добавить преподавателя
app.post('/api/teachers', authenticateToken, upload.single('photo'), async (req, res) => {
    const { first_name, last_name, email, phone, hire_date, department, office_location, qualification } = req.body;
    const photo_file_name = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.jpg';

    try {
        await db.query(
            'INSERT INTO teachers (first_name, last_name, email, phone, hire_date, department, office_location, qualification, photo_file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, phone, hire_date, department, office_location, qualification, photo_file_name]
        );
        res.status(201).json({ message: 'Teacher added' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add teacher' });
    }
});

// Обновить преподавателя
app.put('/api/teachers/:id', authenticateToken, upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, hire_date, department, office_location, qualification } = req.body;
    const photo_file_name = req.file ? `/uploads/${req.file.filename}` : req.body.photo_file_name;

    try {
        await db.query(
            'UPDATE teachers SET first_name = ?, last_name = ?, email = ?, phone = ?, hire_date = ?, department = ?, office_location = ?, qualification = ?, photo_file_name = ? WHERE id = ?',
            [first_name, last_name, email, phone, hire_date, department, office_location, qualification, photo_file_name, id]
        );
        res.json({ message: 'Teacher updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update teacher' });
    }
});

// Удалить преподавателя
app.delete('/api/teachers/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM teachers WHERE id = ?', [id]);
        res.json({ message: 'Teacher deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete teacher' });
    }
});

// Статические файлы для загрузок
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Обслуживание статических файлов Vue.js приложения
app.use(express.static(path.join(__dirname, 'public')));

// Обработка всех остальных запросов для Vue Router
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Улучшенная проверка подключения
db.getConnection()
    .then(conn => {
        console.log('✅ Successfully connected to database');
        conn.release();

        // Запуск сервера только после успешного подключения к БД
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
        process.exit(1); // Завершаем процесс при ошибке подключения
    });

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
});