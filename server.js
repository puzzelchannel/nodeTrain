const express = require("express");
const joi = require("joi");
const app = express();
app.use(express.json());

let customers = [
  { id: 1, name: "sajad" },
  { id: 2, name: "jafar" },
];

app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/api/customers", (req, res) => {
  res.send(customers);
});
app.get("/api/customer/", (req, res) => {
  const target = req.body.id;

  const result = customers.find((item) => item.id === target);
  res.send(result);
});
app.post("/api/customers", (req, res) => {
  const schema = joi.object({
    name: joi.string().min(2).max(10).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.message });
  const new_customer = {
    id: customers[customers.length - 1].id + 1,
    name: req.body.name,
  };
  customers.push(new_customer);
  res.send(new_customer);
});
app.put("/api/customers/:id", (req, res) => {
  console.log("yep");
  const schema = joi.object({
    name: joi.string().min(2).max(10).required(),
    id: joi.number().required(),
  });


  const { error } = schema.validate({ ...req.body, id: req.params.id });
  if (error) return res.status(400).send({ message: error.message });
  const index = customers.findIndex((item) => item.id == req.params.id);
  if (index === -1) return res.status(404).send({ message: "not found" });
  console.log(index);
  console.log(customers[index]);
  customers[index].name = req.body.name;
  res.send(customers[index]);
});
app.delete("/api/customers/:id", (req, res) => {
  console.log("yes");
  const index = customers.findIndex((item) => item.id == req.params.id);
  if (index === -1) return res.status(404).send({ message: "not found" });
  customers = [...customers.slice(0, index), ...customers.slice(index + 1)];
  res.statusCode(200).send();
});

const port = 3001;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`app listen to port ${port}`);
});
