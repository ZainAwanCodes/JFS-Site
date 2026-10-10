const http = require('http');

console.log('--- 🧪 TESTING DATABASE WRITES (POST) ---');

const data = JSON.stringify({
    name: 'Automated Tester',
    comment: 'Confirming that writes to PostgreSQL are completely functional.',
    location: 'Virtual',
    rating: 5
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/reviews',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, res => {
    let responseBody = '';

    res.on('data', chunk => {
        responseBody += chunk;
    });

    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ [PASS] Successfully inserted data into database!`);
            console.log(`   Status Code: ${res.statusCode}`);
            console.log(`   Response Data: ${responseBody}\n`);
        } else {
            console.log(`❌ [FAIL] Error writing to database.`);
            console.log(`   Status Code: ${res.statusCode}`);
            console.log(`   Response: ${responseBody}\n`);
        }
    });
});

req.on('error', error => {
    console.log(`🚨 [ERROR] Connection Failed: ${error.message}\n`);
});

req.write(data);
req.end();
