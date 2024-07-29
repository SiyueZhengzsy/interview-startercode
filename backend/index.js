const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
app.use(cors());


app.use(express.json());


// implement the CORS config
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

//implement the get api for getting products
app.get('/api/products', (req, res) => {
    try {
        const productsWithImages = products.map((product) => {
            const imageUrl = fetchImageUrl();
            return { ...product, imageUrl };
        });
        res.json(productsWithImages);
    } catch (error) {
        console.error('Error fetching products', error);
        res.status(500).json({ error: 'Unable to fetch products' });
    }
});

//implement the delete api for deleting a product by Id
// app.delete('/api/products/:id', (req, res) => {
//     const { id } = req.params;
//     const productId = parseInt(id, 10);
//     if (!productId) {
//         return res.status(400).json({ error: 'Invalid product ID' });
//     }
//     products = products.filter(product => product.id !== productId);

//     res.json({ message: 'Product deleted successfully' });
// });
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const productId = parseInt(id, 10);

    // 检查 productId 是否为有效数字
    if (Number.isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const productIndex = products.findIndex(product => product.id === productId);

    // 检查产品是否存在
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // 获取要删除的产品信息
    const deletedProduct = products[productIndex];

    // 删除产品
    products = products.filter(product => product.id !== productId);

    // 返回被删除的产品信息
    res.json({ message: 'Product deleted successfully', deletedProduct });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
