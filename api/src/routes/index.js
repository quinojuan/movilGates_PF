const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productsRouter = require('./productsRouter.js');
const usersRouter = require('./usersRouter.js');
const brandsRouter = require('./brandsRouter.js');
const ramsRouter = require('./ramsRouter.js');
const capacitiesRouter = require('./capacityRouter.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/products', productsRouter);
router.use('/brands', brandsRouter);
router.use('/rams', ramsRouter);
router.use('/capacities', capacitiesRouter);

router.use('/users', usersRouter);
module.exports = router;
