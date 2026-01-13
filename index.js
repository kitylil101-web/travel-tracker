import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;
const db = new pg.Client({
  host:"localhost",
  user:"postgres",
  password:"123456",
  database:"world",
  port:5432
})
db.connect()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
async function v() {
  const result = await db.query("SELECT country_code FROM visited_country")
  let countries = []
  result.rows.forEach((countries)=>{
    countries.push(countries.country_code)
  })
  return countries
}
app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await v()
  res.render("index.ejs", {countries: countries, total: countries.length})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
