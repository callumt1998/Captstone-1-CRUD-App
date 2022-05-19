const express = require(`express`);
const path = require(`path`);
const exphbs = require(`express-handlebars`);
const logger = require(`./middleware/logger`);
const members = require(`./Members`);

//initalise application
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
//Search Data- TEST
// app.use(`/`, (req, res, next) => {
//   res.send(`Node.js Search and filter`);
// });

//search data- assign route - TEST
// app.use(`/`,(req,res,next)=>{
//   const filters= req.query;
//   const filteredUsers = members.filter(members.some(member)=>{let isValid= true;
//   for (key in filters){
//     console.log(key, members[member],
//   }});
// });

//Creating a Static Folder not needed

//app.use(express.static(path.join(__dirname, `public`)));

// app.get(`/`, (req, res) => {
//   res.sendFile(path.join(__dirname, `Public`, `index.html`));
// });

//members api routes
app.use(`/api/members`, require(`./routes/api/members`));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));
