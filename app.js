const express = require(`express`);
const path = require(`path`);
const exphbs = require(`express-handlebars`);
const logger = require(`./middleware/logger`);
const members = require(`./Members`);
const app = express();

//initialise middleware
app.use(logger);

//Handlebars middleware
app.engine(`handlebars`, exphbs.engine({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage routing
app.get(`/`, (req, res) =>
  res.render(`index`, {
    title: `Member Application`,
    members: members,
  })
);

//Creating a Static Folder not needed

//app.use(express.static(path.join(__dirname, `public`)));

// app.get(`/`, (req, res) => {
//   res.sendFile(path.join(__dirname, `Public`, `index.html`));
// });

//members api routes
app.use(`/api/members`, require(`./routes/api/members`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));
