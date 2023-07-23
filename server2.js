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

// New endpoint that always throws an error
router.get('/multiply_by_two/:id', async (ctx, next) => {
    const id = ctx.params.id
    throw new Error("oh no I forgot to implement this endpoint, what shall I do?")
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('Server error', err);
});

app.listen(3000, () => console.log('Server is running on port 3000'));

