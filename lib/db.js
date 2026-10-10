import prisma from './prisma';

export const db = {
    // Bookings
    bookings: {
        getAll: async () => await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } }),
        add: async (booking) => {
            return await prisma.booking.create({
                data: {
                    ...booking,
                    id: undefined, // Let Prisma handle ID or use mapping
                    status: "Pending",
                    createdAt: new Date()
                }
            });
        },
        updateStatus: async (id, status) => {
            await prisma.booking.update({
                where: { id },
                data: { status }
            });
        },
        delete: async (id) => {
            await prisma.booking.delete({ where: { id } });
        }
    },
    // Shipments
    shipments: {
        getAll: async () => await prisma.shipment.findMany({ orderBy: { updatedAt: 'desc' } }),
        getById: async (id) => await prisma.shipment.findUnique({ where: { id } }),
        add: async (shipment) => {
            return await prisma.shipment.create({
                data: {
                    ...shipment,
                    history: shipment.history || [],
                    updatedAt: new Date()
                }
            });
        },
        update: async (id, updates) => {
            await prisma.shipment.update({
                where: { id },
                data: {
                    ...updates,
                    updatedAt: new Date()
                }
            });
        }
    },
    // Drivers
    drivers: {
        getAll: async () => await prisma.driver.findMany(),
        add: async (driver) => {
            return await prisma.driver.create({
                data: {
                    ...driver,
                    id: undefined
                }
            });
        },
        update: async (id, updates) => {
            await prisma.driver.update({
                where: { id },
                data: updates
            });
        },
        delete: async (id) => {
            await prisma.driver.delete({ where: { id } });
        }
    },
    // Pricing
    pricing: {
        get: async () => {
            const pricing = await prisma.pricing.findFirst();
            return pricing || {
                mazda: 50,
                hyundai: 40,
                shehzore: 35,
                container: 100,
                perKmRate: 15,
                weightMultiplier: 1.2
            };
        },
        update: async (rates) => {
            const current = await prisma.pricing.findFirst();
            if (current) {
                await prisma.pricing.update({
                    where: { id: current.id },
                    data: { ...rates, updatedAt: new Date() }
                });
            } else {
                await prisma.pricing.create({
                    data: { ...rates, id: 1 }
                });
            }
        }
    },
    // Posts
    posts: {
        getAll: async () => await prisma.post.findMany({ orderBy: { createdAt: 'desc' } }),
        getBySlug: async (slug) => await prisma.post.findUnique({ where: { slug } }),
        add: async (post) => {
            return await prisma.post.create({
                data: {
                    ...post,
                    id: undefined,
                    createdAt: new Date()
                }
            });
        },
        update: async (id, updates) => {
            await prisma.post.update({
                where: { id },
                data: { ...updates, updatedAt: new Date() }
            });
        },
        delete: async (id) => {
            await prisma.post.delete({ where: { id } });
        }
    },
    // Reviews
    reviews: {
        getAll: async () => await prisma.review.findMany({ orderBy: { createdAt: 'desc' } }),
        add: async (review) => {
            return await prisma.review.create({
                data: {
                    ...review,
                    id: undefined,
                    createdAt: new Date(),
                    status: "pending"
                }
            });
        },
        updateStatus: async (id, status) => {
            await prisma.review.update({
                where: { id },
                data: { status }
            });
        },
        delete: async (id) => {
            await prisma.review.delete({ where: { id } });
        }
    },
    // Messages
    messages: {
        getAll: async () => await prisma.message.findMany({ orderBy: { createdAt: 'desc' } }),
        add: async (message) => {
            return await prisma.message.create({
                data: {
                    ...message,
                    id: undefined,
                    createdAt: new Date()
                }
            });
        }
    }
};
