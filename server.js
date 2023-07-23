const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/do_stuff', async (ctx, next) => {
    try {
        // Put your business logic here.
        ctx.body = 'Doing stuff!';

        // Log the successful request to stdout.
        console.log(`Success: ${new Date().toISOString()}`);
    } catch (err) {
        // Log the error details to stderr.
        console.error(`Error: ${new Date().toISOString()} - ${err.message}`);

        ctx.status = 500;
        ctx.body = 'Internal server error';
    }
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => console.log('Server is running on port 3000'));

