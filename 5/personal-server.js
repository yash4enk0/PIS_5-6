const http = require('http');
const url = require('url');

const personalData = {
    login: 'is-34fiot-23-184',
    surname: 'Ященко',
    name: 'Олександра',
    course: '2 курс',
    group: 'ІС-34'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (pathname === '/') {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <title>Особисті дані студента</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 600px; 
                        margin: 100px auto; 
                        padding: 20px;
                        background: #f0f0f0;
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; text-align: center; }
                    input { 
                        width: 100%; 
                        padding: 10px; 
                        margin: 10px 0; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                    }
                    button { 
                        width: 100%; 
                        padding: 12px; 
                        background:rgb(46, 46, 46); 
                        color: white; 
                        border: none; 
                        border-radius: 5px; 
                        cursor: pointer; 
                    }
                    button:hover { background:rgb(0, 0, 0); }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Інформація про студента</h1>
                    <form action="/info" method="GET">
                        <label>Введіть ваш логін з Moodle:</label>
                        <input type="text" name="login" required>
                        <button type="submit">Отримати інформацію</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    } 
    else if (pathname === '/info') {
        const login = query.login;
        
        if (!login) {
            res.writeHead(400);
            res.end('<h1>Помилка: логін не вказано!</h1><a href="/">Назад</a>');
            return;
        }

        if(personalData.login !== login) {
            res.writeHead(400);
            res.end('<h1>Помилка: Користувача не знайдено в системі!</h1><a href="/">Назад</a>');
            return;
        }

        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <title>Особисті дані</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        max-width: 600px; 
                        margin: 100px auto; 
                        padding: 20px;
                        background: #f0f0f0;
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; text-align: center; }
                    .info { 
                        background: #f8f9fa; 
                        padding: 20px; 
                        border-radius: 5px; 
                        margin: 20px 0;
                    }
                    .field { 
                        margin: 10px 0; 
                        display: flex; 
                        justify-content: space-between;
                    }
                    .label { font-weight: bold; }
                    a { 
                        display: block; 
                        text-align: center; 
                        margin-top: 20px; 
                        color:rgb(0, 0, 0); 
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Особисті дані студента</h1>
                    <div class="info">
                        <div class="field">
                            <span class="label">Логін у Moodle:</span>
                            <span>${personalData.login}</span>
                        </div>
                        <div class="field">
                            <span class="label">Прізвище:</span>
                            <span>${personalData.surname}</span>
                        </div>
                        <div class="field">
                            <span class="label">Ім'я:</span>
                            <span>${personalData.name}</span>
                        </div>
                        <div class="field">
                            <span class="label">Курс:</span>
                            <span>${personalData.course}</span>
                        </div>
                        <div class="field">
                            <span class="label">Група:</span>
                            <span>${personalData.group}</span>
                        </div>
                    </div>
                    <a href="/">← Повернутися</a>
                </div>
            </body>
            </html>
        `);
    } 
    else {
        res.writeHead(404);
        res.end(`
            <!DOCTYPE html>
            <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <title>Сторінка не знайдена</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        padding: 100px;
                        background: #f0f0f0;
                    }
                    h1 { color: #dc3545; }
                    a { color: #007bff; text-decoration: none; }
                </style>
            </head>
            <body>
                <h1>404 - Сторінка не знайдена</h1>
                <a href="/">На головну</a>
            </body>
            </html>
        `);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`✅ HTTP сервер запущено на http://localhost:${PORT}`);
    console.log(`📋 Відкрийте браузер і введіть http://localhost:${PORT}`);
    console.log(`💡 Введіть свій логін з Moodle для перегляду даних\n`);
});