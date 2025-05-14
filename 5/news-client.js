const https = require('https');
const { URL } = require('url');

const API_KEY = '68bbe5540abf4c98a11ad18cce21cc79';

function makeRequest(url, callback) {
    const urlObj = new URL(url);
    
    const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: 'GET',
        headers: {
            'User-Agent': 'Node.js News Client 1.0'
        }
    };
    
    https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            callback(null, res.statusCode, data);
        });
    }).on('error', (error) => {
        callback(error, null, null);
    }).end();
}

function testNewsAPI() {
    if (API_KEY === 'YOUR_API_KEY') {                
        return;
    }
    
    const testUrl = `https://newsapi.org/v2/everything?q=Ukraine&pageSize=3&apiKey=${API_KEY}`;
    
    console.log('Тестуємо підключення до NewsAPI...');
    
    makeRequest(testUrl, (error, statusCode, data) => {
        if (error) {
            console.error('Помилка мережі:', error.message);
            return;
        }
        
        console.log(`Статус код: ${statusCode}`);
        
        if (statusCode !== 200) {
            console.log('Відповідь сервера:', data.substring(0, 200) + '...');
            return;
        }
        
        try {
            const jsonData = JSON.parse(data);
            
            if (jsonData.status === 'error') {
                console.error('Помилка API:', jsonData.message);
                return;
            }
            
            if (jsonData.articles && jsonData.articles.length > 0) {
                console.log('\n=== НОВИНИ З NEWSAPI ===');
                jsonData.articles.forEach((article, index) => {
                    console.log(`\n${index + 1}. ${article.title}`);
                    console.log(`   Джерело: ${article.source.name}`);
                    console.log(`   Опис: ${article.description || 'Опис відсутній'}`);
                    console.log(`   URL: ${article.url}`);
                });
            } else {
                console.log('Новини не знайдено');
            }
            
        } catch (parseError) {
            console.error('Помилка обробки JSON:', parseError.message);
            console.log('Відповідь:', data.substring(0, 200) + '...');
        }
    });
}

testNewsAPI();