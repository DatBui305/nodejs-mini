import user from './user'
import auth from './auth'
import insert from './insert'
import book from './book'

import { notFound } from '../middleware/handle_error';
const initRoutes = (app) => {
    app.use('/api/v1/user', user);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/insert', insert);    
    app.use('/api/v1/book', book);    

    
    app.use("/", notFound)
}

module.exports = initRoutes;  // Xuất hàm initRoutes để có thể sử dụng trong tệp khác
