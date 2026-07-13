// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import adminRoutes from './AdminRoutes.jsx';

const router = createBrowserRouter([
    ...adminRoutes
]);

export default router;
