const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const geoip = require('geoip-lite');
const bcrypt = require('bcryptjs'); // 使用 bcryptjs
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// 登录接口
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// 获取游客地址
app.get('/api/location', (req, res) => {
    const ip = req.ip === '::1' ? '8.8.8.8' : req.ip; // 本地测试用公共 IP
    const geo = geoip.lookup(ip);
    res.json(geo || { error: 'Location not found' });
});

app.listen(5000, () => console.log('Server running on port 5000'));