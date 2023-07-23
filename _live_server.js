const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/do_stuff', async (ctx, next) => {
    try {
        ctx.body = 'Doing stuff!';
        console.log(`Success: ${new Date().toISOString()}`);
    } catch (err) {
        console.error(`Error: ${new Date().toISOString()} - ${err.message}`);
        ctx.status = 500;
        ctx.body = 'Internal server error';
    }
    await next();
});

router.get('/multiply_by_two/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id);
    if (!isNaN(id)) {
        ctx.body = {result: id * 2};
    } else {
        ctx.status = 400;
        ctx.body = 'Invalid id provided';
    }
    await next();
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('Server error', err);
});

app.listen(3000, () => console.log('Server is running on port 3000'));