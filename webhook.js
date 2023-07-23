const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// Middleware to parse the request body
app.use(bodyParser());

// POST /webhook endpoint
app.use(async (ctx) => {
  if (ctx.method === 'POST' && ctx.path === '/webhook') {
    // Extract the data from the request body
    const webhookData = ctx.request.body;
    console.log('Received webhook data:', webhookData);

    // Respond with a 200 status to acknowledge receipt
    ctx.status = 200;
    ctx.body = 'Webhook received successfully';
  }
});

// Start the server on port 3000
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

