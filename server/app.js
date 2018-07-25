const Maius = require('maius');

const port = 3000;
const app = new Maius({
  rootDir: __dirname,
});

app.listen(port).then(() => {
  console.log(`APP Started, http://localhost:${port}`);
});
