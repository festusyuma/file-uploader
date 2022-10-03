import Express from 'express';

const router = Express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'true' });
});

export default router;
