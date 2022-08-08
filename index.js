const express = require('express');
const employees = require('./src/controller/employees');
const cors = require('cors');

const server = express();
const port = 3333;

server.use(express.json());
server.use(cors());

server.post('/employee', employees.create);
server.get('/employee', employees.read);
server.get('/employee_txt/:txtSearch', employees.readEmployeeTxt);
server.get('/employee_cpf', employees.readEmployeeCpf);
server.put('/employee', employees.updateEmployee);
server.delete('/employee', employees.deleteEmployee);



server.listen(3333, () => {
  console.log(`servidor online na porta ${port}`)
});
