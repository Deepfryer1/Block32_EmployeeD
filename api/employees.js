const express=require("express");
const router=express.Router();
const employees = require("../employees");

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

router.post('/', async(req, res, next) => {
  const { name } = req.body;
  const id = employees.length + 1;
  employees.push({ id, name });
  if(employees.length === id ){
    res.json(employees);
  } else {
    res.status(404).send('couldnt add the employee');
  }
});

module.exports=router
