require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Category = require("../models/category");
const Item = require("../models/item");

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [
  {
    name: "Modern Sofa",
    description: "A stylish and comfortable sofa for your living room.",
    price: 499.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1506898667547-42e22a46e125?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1506898667547-42e22a46e125?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    categoryName: "Home & Kitchen",
    subcategoryName: "Furniture",
  },
  {
    name: "Blender Pro 5000",
    description: "Powerful blender with multiple speed settings.",
    price: 89.99,
    images: {
      min: [
        "https://plus.unsplash.com/premium_photo-1663853294058-3f85f18a4bed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://plus.unsplash.com/premium_photo-1663853294058-3f85f18a4bed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Home & Kitchen",
    subcategoryName: "Kitchen Appliances",
  },
  {
    name: "Luxury Cotton Sheets",
    description: "High-quality cotton sheets for ultimate comfort.",
    price: 59.99,
    images: {
      min: [
        "https://plus.unsplash.com/premium_photo-1670475326413-f69f74397650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hlZXRzfGVufDB8fDB8fHww",
      ],
      max: [
        "https://plus.unsplash.com/premium_photo-1670475326413-f69f74397650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hlZXRzfGVufDB8fDB8fHww",
      ],
    },
    categoryName: "Home & Kitchen",
    subcategoryName: "Bedding",
  },
  {
    name: "Matte Lipstick Set",
    description: "A set of 5 long-lasting matte lipsticks.",
    price: 29.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1587055682234-853183f4523c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlwc3RpY2t8ZW58MHx8MHx8fDA%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1587055682234-853183f4523c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlwc3RpY2t8ZW58MHx8MHx8fDA%3D",
      ],
    },
    categoryName: "Beauty & Personal Care",
    subcategoryName: "Makeup",
  },
  {
    name: "Argan Oil Shampoo",
    description: "Moisturizing shampoo enriched with argan oil.",
    price: 15.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Beauty & Personal Care",
    subcategoryName: "Hair Care",
  },
  {
    name: "Vitamin C Serum",
    description: "Brightening serum for radiant skin.",
    price: 19.99,
    images: {
      min: [
        "https://plus.unsplash.com/premium_photo-1668087352456-8d15bbefdacf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dml0YW1pbnxlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://plus.unsplash.com/premium_photo-1668087352456-8d15bbefdacf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dml0YW1pbnxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Beauty & Personal Care",
    subcategoryName: "Skin Care",
  },
  {
    name: "Camping Tent 4-Person",
    description: "Waterproof camping tent suitable for 4 people.",
    price: 120.0,
    images: {
      min: [
        "https://plus.unsplash.com/premium_photo-1681169152396-f22381eae362?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVudHxlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://plus.unsplash.com/premium_photo-1681169152396-f22381eae362?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVudHxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Sports & Outdoors",
    subcategoryName: "Camping & Hiking",
  },
  {
    name: "Adjustable Dumbbells Set",
    description: "Set of adjustable dumbbells for home workouts.",
    price: 89.99,
    images: {
      min: [
        "https://plus.unsplash.com/premium_photo-1664536967979-7d72564bfe57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RHVtYmJlbGxzfGVufDB8fDB8fHww",
      ],
      max: [
        "https://plus.unsplash.com/premium_photo-1664536967979-7d72564bfe57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RHVtYmJlbGxzfGVufDB8fDB8fHww",
      ],
    },
    categoryName: "Sports & Outdoors",
    subcategoryName: "Fitness Equipment",
  },
  {
    name: "Mountain Bike",
    description: "Durable mountain bike for all-terrain cycling.",
    price: 499.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZXxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Sports & Outdoors",
    subcategoryName: "Cycling",
  },
  {
    name: "The Great Novel",
    description: "A bestselling fiction novel by a famous author.",
    price: 19.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1529590003495-b2646e2718bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1529590003495-b2646e2718bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      ],
    },
    categoryName: "Books & Stationery",
    subcategoryName: "Fiction",
  },
  {
    name: "Biography of a Legend",
    description: "An in-depth biography of a world-renowned figure.",
    price: 24.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJvb2t8ZW58MHx8MHx8fDA%3D",
      ],
    },
    categoryName: "Books & Stationery",
    subcategoryName: "Non-Fiction",
  },
  {
    name: "Classic Notebook Set",
    description: "Set of 3 high-quality notebooks for your notes.",
    price: 12.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5vdGVib29rfGVufDB8fDB8fHww",
      ],
      max: [
        "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5vdGVib29rfGVufDB8fDB8fHww",
      ],
    },
    categoryName: "Books & Stationery",
    subcategoryName: "Stationery",
  },
  {
    name: "Car Dash Cam",
    description: "1080p dash cam with night vision and motion detection.",
    price: 49.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1528312635006-8ea0bc49ec63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHklMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D",
      ],
    },
    categoryName: "Automotive",
    subcategoryName: "Car Electronics",
  },
  {
    name: "Roof Rack Cargo Carrier",
    description: "Heavy-duty roof rack for long trips and extra storage.",
    price: 199.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1452167031782-c3e7bb820e65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FycmllcnxlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1452167031782-c3e7bb820e65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2FycmllcnxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Automotive",
    subcategoryName: "Exterior Accessories",
  },
  {
    name: "Car Maintenance Tool Set",
    description: "Comprehensive tool set for car repair and maintenance.",
    price: 69.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1606676539940-12768ce0e762?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VG9vbHN8ZW58MHx8MHx8fDA%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1606676539940-12768ce0e762?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VG9vbHN8ZW58MHx8MHx8fDA%3D",
      ],
    },
    categoryName: "Automotive",
    subcategoryName: "Tools & Equipment",
  },
  {
    name: "Monopoly Classic Edition",
    description: "The classic board game for family and friends.",
    price: 29.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ub3BvbHl8ZW58MHx8MHx8fDA%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ub3BvbHl8ZW58MHx8MHx8fDA%3D",
      ],
    },
    categoryName: "Toys & Games",
    subcategoryName: "Board Games",
  },
  {
    name: "PS5 Console",
    description: "The latest PlayStation 5 gaming console.",
    price: 499.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1659540738451-97c1a3d49a3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBTNXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      max: [
        "https://images.unsplash.com/photo-1659540738451-97c1a3d49a3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBTNXxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    categoryName: "Toys & Games",
    subcategoryName: "Video Games",
  },
  {
    name: "STEM Building Blocks",
    description: "Educational building blocks for creative play.",
    price: 39.99,
    images: {
      min: [
        "https://images.unsplash.com/photo-1558907353-ceb54f3882ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG95JTIwYmxvY2tzfGVufDB8fDB8fHww",
      ],
      max: [
        "https://images.unsplash.com/photo-1558907353-ceb54f3882ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG95JTIwYmxvY2tzfGVufDB8fDB8fHww",
      ],
    },
    categoryName: "Toys & Games",
    subcategoryName: "Educational Toys",
  },
  {
    name: "Men's Leather Jacket",
    description: "Stylish and durable leather jacket for casual wear.",
    price: 249.99,
    images: {
      min: [
        "https://www.mrporter.com/variants/images/560971903906151/in/w2000_q60.jpg",
        "https://www.mrporter.com/variants/images/560971903906151/in/w2000_q60.jpg",
      ],
      max: [
        "https://www.mrporter.com/variants/images/560971903906151/in/w2000_q60.jpg",
        "https://www.mrporter.com/variants/images/560971903906151/in/w2000_q60.jpg",
      ],
    },
    categoryName: "Clothing",
    subcategoryName: "Men",
  },
  {
    name: "Men's Running Shoes",
    description:
      "Lightweight and comfortable running shoes for daily training.",
    price: 89.99,
    images: {
      min: [
        "https://media.gq.com/photos/664c9e51ee6c2c5a7de3f1c2/3:4/w_748%2Cc_limit/TRACKSMITH.png",
        "https://media.gq.com/photos/664c9e51ee6c2c5a7de3f1c2/3:4/w_748%2Cc_limit/TRACKSMITH.png",
      ],
      max: [
        "https://media.gq.com/photos/664c9e51ee6c2c5a7de3f1c2/3:4/w_748%2Cc_limit/TRACKSMITH.png",
        "https://media.gq.com/photos/664c9e51ee6c2c5a7de3f1c2/3:4/w_748%2Cc_limit/TRACKSMITH.png",
      ],
    },
    categoryName: "Clothing",
    subcategoryName: "Men",
  },

  {
    name: "Women's Summer Dress",
    description: "Light and airy summer dress perfect for warm weather.",
    price: 69.99,
    images: {
      min: [
        "https://image-resizing.booztcdn.com/twist-and-tango/tat8203_cmint.webp?has_grey=1&has_webp=1&dpr=2.5&size=w400",
        "https://image-resizing.booztcdn.com/twist-and-tango/tat8203_cmint.webp?has_grey=1&has_webp=1&dpr=2.5&size=w400",
      ],
      max: [
        "https://image-resizing.booztcdn.com/twist-and-tango/tat8203_cmint.webp?has_grey=1&has_webp=1&dpr=2.5&size=w400",
        "https://image-resizing.booztcdn.com/twist-and-tango/tat8203_cmint.webp?has_grey=1&has_webp=1&dpr=2.5&size=w400",
      ],
    },
    categoryName: "Clothing",
    subcategoryName: "Women",
  },
  {
    name: "Women's Handbag",
    description: "Fashionable handbag with ample storage for daily use.",
    price: 129.99,
    images: {
      min: [
        "https://studijapienene.lv/wp-content/uploads/2023/04/feltstyle-handbag-grey-500x404.png",
        "https://studijapienene.lv/wp-content/uploads/2023/04/feltstyle-handbag-grey-500x404.png",
      ],
      max: [
        "https://studijapienene.lv/wp-content/uploads/2023/04/feltstyle-handbag-grey-500x404.png",
        "https://studijapienene.lv/wp-content/uploads/2023/04/feltstyle-handbag-grey-500x404.png",
      ],
    },
    categoryName: "Clothing",
    subcategoryName: "Women",
  },

  {
    name: "Kids' T-Shirt",
    description: "Soft cotton t-shirt with playful designs.",
    price: 19.99,
    images: {
      min: [
        "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/235459s2.jpg",
        "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/235459s2.jpg",
      ],
      max: [
        "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/235459s2.jpg",
        "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/235459s2.jpg",
      ],
    },
    categoryName: "Clothing",
    subcategoryName: "Kids",
  },
  {
    name: "Kids' Sneakers",
    description: "Comfortable sneakers designed for active kids.",
    price: 39.99,
    images: {
      min: [
        "https://bernumode.lv/19088-large_default/viking-aero-sl-sporty-lightweight-kids-shoe-3.jpg",
        "https://bernumode.lv/19088-large_default/viking-aero-sl-sporty-lightweight-kids-shoe-3.jpg",
      ],
      max: [
        "https://bernumode.lv/19088-large_default/viking-aero-sl-sporty-lightweight-kids-shoe-3.jpg",
        "https://bernumode.lv/19088-large_default/viking-aero-sl-sporty-lightweight-kids-shoe-3.jpg",
      ],
    },
    categoryName: "Clothing",
    subcategoryName: "Kids",
  },

  {
    name: "iPhone 13 Pro",
    description:
      "Apple's flagship smartphone with A15 Bionic chip and 5G support.",
    price: 999.99,
    images: {
      min: [
        "https://istore.lv/media/catalog/product/cache/2/small_image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone_13_starlight.jpg",
        "https://istore.lv/media/catalog/product/cache/2/small_image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone_13_starlight.jpg",
      ],
      max: [
        "https://istore.lv/media/catalog/product/cache/2/small_image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone_13_starlight.jpg",
        "https://istore.lv/media/catalog/product/cache/2/small_image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone_13_starlight.jpg",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Mobile Phones",
  },
  {
    name: "Samsung Galaxy S21",
    description: "Samsung's premium smartphone with dynamic AMOLED display.",
    price: 799.99,
    images: {
      min: [
        "https://cdn.alloallo.media/catalog/product/samsung/galaxy-s/galaxy-s21/galaxy-s21-phantom-white.jpg",
        "https://cdn.alloallo.media/catalog/product/samsung/galaxy-s/galaxy-s21/galaxy-s21-phantom-white.jpg",
      ],
      max: [
        "https://cdn.alloallo.media/catalog/product/samsung/galaxy-s/galaxy-s21/galaxy-s21-phantom-white.jpg",
        "https://cdn.alloallo.media/catalog/product/samsung/galaxy-s/galaxy-s21/galaxy-s21-phantom-white.jpg",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Mobile Phones",
  },

  {
    name: "MacBook Air M1",
    description: "Apple's lightweight laptop powered by the M1 chip.",
    price: 1299.99,
    images: {
      min: [
        "https://www.dateks.lv/images/pic/2400/2400/425/799.jpg",
        "https://www.dateks.lv/images/pic/2400/2400/425/799.jpg",
      ],
      max: [
        "https://www.dateks.lv/images/pic/2400/2400/425/799.jpg",
        "https://www.dateks.lv/images/pic/2400/2400/425/799.jpg",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Laptops",
  },
  {
    name: "Dell XPS 13",
    description:
      "Premium Windows laptop with infinity edge display and Intel i7 processor.",
    price: 1399.99,
    images: {
      min: [
        "https://www.dateks.lv/images/pic/2400/2400/571/1777.jpg",
        "https://www.dateks.lv/images/pic/2400/2400/571/1777.jpg",
      ],
      max: [
        "https://www.dateks.lv/images/pic/2400/2400/571/1777.jpg",
        "https://www.dateks.lv/images/pic/2400/2400/571/1777.jpg",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Laptops",
  },

  {
    name: "Canon EOS R5",
    description:
      "Mirrorless camera with 8K video support and 45MP full-frame sensor.",
    price: 3899.99,
    images: {
      min: [
        "https://i1.adis.ws/i/canon/eos-r5-mark-ii_gallery_01_8504542d32ec4b8c99e4437d2fae31ff?$prod-spec-hero-1by1-jpg$",
        "https://i1.adis.ws/i/canon/eos-r5-mark-ii_gallery_01_8504542d32ec4b8c99e4437d2fae31ff?$prod-spec-hero-1by1-jpg$",
      ],
      max: [
        "https://i1.adis.ws/i/canon/eos-r5-mark-ii_gallery_01_8504542d32ec4b8c99e4437d2fae31ff?$prod-spec-hero-1by1-jpg$",
        "https://i1.adis.ws/i/canon/eos-r5-mark-ii_gallery_01_8504542d32ec4b8c99e4437d2fae31ff?$prod-spec-hero-1by1-jpg$",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Cameras",
  },
  {
    name: "Nikon Z6 II",
    description:
      "Nikon's full-frame mirrorless camera with dual EXPEED 6 processors.",
    price: 1999.99,
    images: {
      min: [
        "https://www.masterfoto.lv/194583-thickbox_default/nikon-z6-ii-body.jpg",
        "https://www.masterfoto.lv/194583-thickbox_default/nikon-z6-ii-body.jpg",
      ],
      max: [
        "https://www.masterfoto.lv/194583-thickbox_default/nikon-z6-ii-body.jpg",
        "https://www.masterfoto.lv/194583-thickbox_default/nikon-z6-ii-body.jpg",
      ],
    },
    categoryName: "Electronics",
    subcategoryName: "Cameras",
  },
];
const createItems = async () => {
  try {
    const categories = await Category.find({});

    const categoryMap = categories.reduce((acc, category) => {
      acc[category.name] = category;
      return acc;
    }, {});

    const itemsWithCategory = items.map((item) => {
      const category = categoryMap[item.categoryName] || categoryMap["Other"];
      const subcategory = category.subcategories.find(
        (sub) => sub.name === item.subcategoryName
      ) || {
        _id: mongoose.Types.ObjectId("defaultSubcategoryId"),
        name: "Other",
        description: "",
      };

      return {
        ...item,
        category: category._id,
        subcategory: subcategory._id,
      };
    });

    await Item.deleteMany();
    const result = await Item.insertMany(itemsWithCategory);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating items:", error);
  }
};

createItems();
