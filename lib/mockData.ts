export const mockShipments = [
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
  },
  {
    id: "SHP-1003",
    status: "Pending",
    origin: "Quetta",
    destination: "Lahore",
    estimatedDelivery: "2023-10-28",
    currentLocation: "Warehouse",
    history: []
  },
];

export const mockAdminStats = {
  totalBookings: 154,
  activeShipments: 42,
  revenue: 1250000,
  recentBookings: [
    { id: "BK-501", customer: "Ali Express", route: "LHR - KHI", amount: 45000, status: "Pending" },
    { id: "BK-502", customer: "Textile Mills", route: "FSD - LHR", amount: 25000, status: "Completed" },
    { id: "BK-503", customer: "Tech Zone", route: "ISL - RWP", amount: 8000, status: "In Transit" },
    { id: "BK-504", customer: "Fresh Fruits", route: "MUX - LHR", amount: 35000, status: "Completed" },
    { id: "BK-505", customer: "Auto Parts", route: "LHR - DGK", amount: 12000, status: "Pending" },
  ]
};

export const mockBlogPosts = [
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
  },
  {
    id: "2",
    slug: "future-of-transport-pakistan",
    title: "The Future of Goods Transport in Pakistan",
    excerpt: "Analyzing the impact of CPEC and modern technology on the trucking industry.",
    date: "September 28, 2023",
    author: "Ali Hassan",
    category: "Industry News",
    content: "With the development of CPEC routes, the transport sector is witnessing...",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    slug: "safe-packing-guide",
    title: "How to Safely Pack Fragile Items for Long Distance",
    excerpt: "A step-by-step guide to ensuring your valuable goods reach their destination intact.",
    date: "November 05, 2023",
    author: "Sara Ahmed",
    category: "Guides",
    content: "Packing fragile items requires care and the right materials...",
    image: "https://images.unsplash.com/photo-1566576912902-192f8013e6c3?q=80&w=2070&auto=format&fit=crop"
  }
];
