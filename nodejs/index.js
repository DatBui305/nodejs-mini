import express from 'express';
import cors from 'cors';
require("dotenv").config();  // Tải các biến môi trường từ tệp .env
import initRoutes from './src/routes';  // Nhập các routes từ tệp routes
require('./connection_database')
const app = express();  // Tạo một ứng dụng Express



// Cấu hình middleware CORS
app.use(cors({
    origin: process.env.CLIENT_URL,  // Chỉ cho phép yêu cầu từ URL client được chỉ định trong biến môi trường
    methods: ["GET", "POST", "DELETE", "PUT"]  // Chỉ cho phép các phương thức HTTP này
}));

// Cấu hình middleware để phân tích cú pháp dữ liệu JSON và URL-encoded
app.use(express.json());  // Cho phép xử lý các yêu cầu với dữ liệu JSON
app.use(express.urlencoded({ extended: true }));  // Cho phép xử lý các yêu cầu với dữ liệu URL-encoded

// Định nghĩa các routes
initRoutes(app);  // Khởi tạo các routes bằng cách gọi hàm initRoutes với đối tượng app

const PORT = process.env.PORT || 8000;  // Đặt số cổng từ biến môi trường hoặc mặc định là 8000

// Khởi động máy chủ
const listener = app.listen(PORT, () => {
    console.log("Server is running on the port " + listener.address().port);  // In ra console rằng máy chủ đang chạy và số cổng
});


// morgan and compression