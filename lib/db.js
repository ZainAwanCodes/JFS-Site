import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory and db.json exist
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({
        bookings: [],
        shipments: [
            {
                id: "SHP-1001",
                status: "In Transit",
                origin: "Lahore",
                destination: "Karachi",
                estimatedDelivery: "2023-10-25",
                currentLocation: "Sukkur Bypass",
                history: [
                    { status: "Picked Up", date: "2023-10-22 10:00 AM", location: "Lahore" },
                    { status: "In Transit", date: "2023-10-23 02:00 PM", location: "Multan" },
                ]
            },
            {
                id: "SHP-1002",
                status: "Delivered",
                origin: "Islamabad",
                destination: "Peshawar",
                estimatedDelivery: "2023-10-20",
                currentLocation: "Delivered",
                history: [
                    { status: "Delivered", date: "2023-10-20 04:00 PM", location: "Peshawar" }
                ]
            }
        ],
        drivers: [
            {
                id: "1",
                name: "Ali Khan",
                phone: "0300-1234567",
                truckNumber: "LEC-1234",
                truckType: "Mazda",
                city: "Lahore",
                status: "Active",
            },
            {
                id: "2",
                name: "Muhammad Rizwan",
                phone: "0321-9876543",
                truckNumber: "KHI-5678",
                truckType: "Container",
                city: "Karachi",
                status: "On Trip",
            }
        ],
        pricing: {
            mazda: 50,
            hyundai: 80,
            shehzore: 30,
            container: 120,
            perKmRate: 1,
            weightMultiplier: 0.1,
        },
        posts: [
            {
                id: "1",
                slug: "top-5-logistics-tips",
                title: "Top 5 Logistics Tips for Small Businesses in Pakistan",
                excerpt: "Discover how to optimize your supply chain and reduce costs with our expert advice tailored for the local market.",
                date: "October 15, 2023",
                author: "JFS Team",
                category: "Tips & Tricks",
                content: "Logistics is the backbone of any product-based business...",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
            }
        ],
        reviews: [],
        messages: []
    }, null, 2));
}

function readDb() {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        const parsed = JSON.parse(data);
        return {
            bookings: parsed.bookings || [],
            shipments: parsed.shipments || [],
            drivers: parsed.drivers || [],
            pricing: parsed.pricing || {
                mazda: 50,
                hyundai: 40,
                shehzore: 35,
                container: 100,
                perKmRate: 15,
                weightMultiplier: 1.2
            },
            posts: parsed.posts || [],
            reviews: parsed.reviews || [],
            messages: parsed.messages || []
        };
    } catch (error) {
        return {
            bookings: [],
            shipments: [],
            drivers: [],
            pricing: { mazda: 50, hyundai: 40, shehzore: 35, container: 100, perKmRate: 15, weightMultiplier: 1.2 },
            posts: [],
            reviews: [],
            messages: []
        };
    }
}

function writeDb(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = {
    // Bookings
    bookings: {
        getAll: () => readDb().bookings,
        add: (booking) => {
            const data = readDb();
            const newBooking = {
                status: "Pending",
                ...booking,
                id: `BK-${Date.now()}`,
                createdAt: new Date().toISOString()
            };
            data.bookings.push(newBooking);
            writeDb(data);
            return newBooking;
        },
        updateStatus: (id, status) => {
            const data = readDb();
            data.bookings = data.bookings.map(b => b.id === id ? { ...b, status } : b);
            writeDb(data);
        },
        delete: (id) => {
            const data = readDb();
            data.bookings = data.bookings.filter(b => b.id !== id);
            writeDb(data);
        }
    },
    // Shipments
    shipments: {
        getAll: () => readDb().shipments,
        getById: (id) => readDb().shipments.find(s => s.id === id),
        add: (shipment) => {
            const data = readDb();
            const newShipment = { ...shipment, updatedAt: new Date().toISOString() };
            if (!newShipment.history) newShipment.history = [];
            data.shipments.push(newShipment);
            writeDb(data);
            return newShipment;
        },
        update: (id, updates) => {
            const data = readDb();
            data.shipments = data.shipments.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s);
            writeDb(data);
        }
    },
    // Drivers
    drivers: {
        getAll: () => readDb().drivers,
        add: (driver) => {
            const data = readDb();
            const newDriver = { ...driver, id: `DR-${Date.now()}` };
            data.drivers.push(newDriver);
            writeDb(data);
            return newDriver;
        },
        update: (id, updates) => {
            const data = readDb();
            data.drivers = data.drivers.map(d => d.id === id ? { ...d, ...updates } : d);
            writeDb(data);
        },
        delete: (id) => {
            const data = readDb();
            data.drivers = data.drivers.filter(d => d.id !== id);
            writeDb(data);
        }
    },
    // Pricing
    pricing: {
        get: () => readDb().pricing,
        update: (rates) => {
            const data = readDb();
            data.pricing = { ...rates, updatedAt: new Date().toISOString() };
            writeDb(data);
        }
    },
    // Posts
    posts: {
        getAll: () => readDb().posts,
        getBySlug: (slug) => readDb().posts.find(p => p.slug === slug),
        add: (post) => {
            const data = readDb();
            const newPost = { ...post, id: `POST-${Date.now()}`, createdAt: new Date().toISOString() };
            data.posts.push(newPost);
            writeDb(data);
            return newPost;
        },
        update: (id, updates) => {
            const data = readDb();
            data.posts = data.posts.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
            writeDb(data);
        },
        delete: (id) => {
            const data = readDb();
            data.posts = data.posts.filter(p => p.id !== id);
            writeDb(data);
        }
    },
    // Reviews
    reviews: {
        getAll: () => readDb().reviews,
        add: (review) => {
            const data = readDb();
            const newReview = { ...review, id: `REV-${Date.now()}`, createdAt: new Date().toISOString(), status: "pending" };
            data.reviews.push(newReview);
            writeDb(data);
            return newReview;
        },
        updateStatus: (id, status) => {
            const data = readDb();
            data.reviews = data.reviews.map(r => r.id === id ? { ...r, status } : r);
            writeDb(data);
        },
        delete: (id) => {
            const data = readDb();
            data.reviews = data.reviews.filter(r => r.id !== id);
            writeDb(data);
        }
    },
    // Messages
    messages: {
        getAll: () => readDb().messages,
        add: (message) => {
            const data = readDb();
            const newMessage = { ...message, id: `MSG-${Date.now()}`, createdAt: new Date().toISOString() };
            data.messages.push(newMessage);
            writeDb(data);
            return newMessage;
        }
    }
};
