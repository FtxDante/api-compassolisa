const app = require('./app');

const port = 3000;

app.listen(port, () => {
  console.table({
    status: `Running`,
  });
});
