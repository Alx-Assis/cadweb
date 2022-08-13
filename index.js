const express = require('express');
const cors = require('cors');
const employees = require('./src/controller/employees');

const server = express();
const port = 8080;

server.use(express.json({ extended: false }));
server.use(cors());

server.post('/employee', employees.create);
server.get('/employee', employees.read);
server.get('/employee_txt/:txtSearch', employees.readEmployeeTxt);
server.get('/employee_cpf', employees.readEmployeeCpf);
server.put('/employee', employees.updateEmployee);
server.delete('/employee', employees.deleteEmployee);

server.listen(port, () => {
  console.log(`servidor online na porta ${port}`)
});
