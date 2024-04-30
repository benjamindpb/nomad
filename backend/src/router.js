import { Router } from 'express';
import {
    checkCart,
    getRandomCart,
} from './controllers/appController.js'

const router = Router();

router.get('/test', (req, res) => {
    res.send('Test endpoint')
});

router.get('/cart', getRandomCart);
router.post('/cart', checkCart);


export default router;