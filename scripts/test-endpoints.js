const http = require('http');

const ENDPOINTS = [
    '/api/bookings',
    '/api/shipments',
    '/api/drivers',
    '/api/pricing',
    '/api/blog',
    '/api/reviews',
    '/api/contact'
];

const BASE_URL = 'http://localhost:3000';

console.log('--- 🧪 STARTING API INTEGRATION TESTS ---\n');

async function testEndpoint(endpoint) {
    return new Promise((resolve) => {
        http.get(`${BASE_URL}${endpoint}`, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const isArray = Array.isArray(parsed);
                    const length = isArray ? parsed.length : Object.keys(parsed).length;

                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        console.log(`✅ [PASS] GET ${endpoint} - Status: ${res.statusCode}`);
                        console.log(`   Returned: ${isArray ? 'Array' : 'Object'} with ${length} records/keys.\n`);
                        resolve({ success: true, endpoint, data: parsed });
                    } else {
                        console.log(`❌ [FAIL] GET ${endpoint} - Status: ${res.statusCode}`);
                        console.log(`   Response: ${data}\n`);
                        resolve({ success: false, endpoint, error: data });
                    }
                } catch (e) {
                    console.log(`❌ [FAIL] GET ${endpoint} - Parse Error: ${e.message}`);
                    resolve({ success: false, endpoint, error: e.message });
                }
            });
        }).on('error', (err) => {
            console.log(`🚨 [ERROR] GET ${endpoint} - Connection Failed: ${err.message}\n`);
            resolve({ success: false, endpoint, error: err.message });
        });
    });
}

async function runTests() {
    let passed = 0;
    let failed = 0;

    for (const endpoint of ENDPOINTS) {
        const result = await testEndpoint(endpoint);
        if (result.success) passed++;
        else failed++;
    }

    console.log('--- TEST SUMMARY ---');
    console.log(`Total Passed : ${passed}`);
    console.log(`Total Failed : ${failed}`);

    // Additional sanity check on a specific dynamic route (e.g. tracking a shipment)
    console.log('\n--- 🧪 TESTING SPECIFIC SHIPMENT TRACKING ---');
    try {
        const trackingTest = await testEndpoint('/api/shipments?id=SHP-1001');
        if (trackingTest.success && trackingTest.data.id === 'SHP-1001') {
            console.log('✅ [PASS] Shipment Tracking by ID successful!');
        } else {
            console.log('❌ [FAIL] Shipment Tracking by ID did not return expected data.');
        }
    } catch (e) {
        console.log('❌ [FAIL] Shipment Tracking by ID failed completely.');
    }
}

runTests();
