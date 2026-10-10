const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrate() {
    console.log('Starting migration from JSON to PostgreSQL...');

    const dbPath = path.join(process.cwd(), 'data', 'db.json');
    if (!fs.existsSync(dbPath)) {
        console.error('Core data file (db.json) not found!');
        return;
    }

    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // 1. Migrate Pricing
    if (data.pricing) {
        console.log('Migrating Pricing...');
        const { updatedAt, ...pricingData } = data.pricing;
        await prisma.pricing.upsert({
            where: { id: 1 },
            update: pricingData,
            create: { ...pricingData, id: 1 }
        });
    }

    // 2. Migrate Drivers
    if (data.drivers) {
        console.log(`Migrating ${data.drivers.length} Drivers...`);
        for (const driver of data.drivers) {
            await prisma.driver.upsert({
                where: { id: driver.id },
                update: driver,
                create: driver
            });
        }
    }

    // 3. Migrate Bookings
    if (data.bookings) {
        console.log(`Migrating ${data.bookings.length} Bookings...`);
        for (const booking of data.bookings) {
            const { createdAt, ...bookingData } = booking;
            await prisma.booking.upsert({
                where: { id: booking.id },
                update: {
                    ...bookingData,
                    createdAt: createdAt ? new Date(createdAt) : undefined
                },
                create: {
                    ...bookingData,
                    createdAt: createdAt ? new Date(createdAt) : new Date()
                }
            });
        }
    }

    // 4. Migrate Shipments
    if (data.shipments) {
        console.log(`Migrating ${data.shipments.length} Shipments...`);
        for (const shipment of data.shipments) {
            const { updatedAt, ...shipmentData } = shipment;
            await prisma.shipment.upsert({
                where: { id: shipment.id },
                update: {
                    ...shipmentData,
                    history: shipment.history || [],
                },
                create: {
                    ...shipmentData,
                    history: shipment.history || [],
                }
            });
        }
    }

    // 5. Migrate Posts
    if (data.posts) {
        console.log(`Migrating ${data.posts.length} Posts...`);
        for (const post of data.posts) {
            const { createdAt, updatedAt, ...postData } = post;
            await prisma.post.upsert({
                where: { id: post.id },
                update: {
                    ...postData,
                    createdAt: createdAt ? new Date(createdAt) : undefined
                },
                create: {
                    ...postData,
                    createdAt: createdAt ? new Date(createdAt) : new Date()
                }
            });
        }
    }

    // 6. Migrate Reviews
    if (data.reviews) {
        console.log(`Migrating ${data.reviews.length} Reviews...`);
        for (const review of data.reviews) {
            const { createdAt, ...reviewData } = review;
            await prisma.review.upsert({
                where: { id: review.id },
                update: {
                    ...reviewData,
                    createdAt: createdAt ? new Date(createdAt) : undefined
                },
                create: {
                    ...reviewData,
                    createdAt: createdAt ? new Date(createdAt) : new Date()
                }
            });
        }
    }

    // 7. Migrate Messages
    if (data.messages) {
        console.log(`Migrating ${data.messages.length} Messages...`);
        for (const message of data.messages) {
            const { createdAt, ...messageData } = message;
            await prisma.message.upsert({
                where: { id: message.id },
                update: {
                    ...messageData,
                    createdAt: createdAt ? new Date(createdAt) : undefined
                },
                create: {
                    ...messageData,
                    createdAt: createdAt ? new Date(createdAt) : new Date()
                }
            });
        }
    }

    console.log('Migration completed successfully!');
}

migrate()
    .catch(e => {
        console.error('Migration failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
