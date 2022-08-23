const {query} = require('express');
const connection = require('../database/connection')
module.exports = {
  async create(req, res) {
    const {
      name,
      cpf,
      email,
      whatsApp,
      Address,
    } = req.body;
    try {
    const [id] = await connection('employees').insert({
      name,
      cpf,
      email,
      whatsApp,
      Address,
    });

    return res.json({ id });
    }catch(e) {
    console.log(e)
      return res.status(503).json({ message: `Produto ja cadastrado com cpf ${cpf}` });
    };
 },

  async read(req, res) {
    const employees = await connection('employees').select('*');

    return res.status(200).json(employees);
  },

  async readEmployeeCpf(req, res) {
    const { cpf } = req.body;
    const CPF = await connection('employees').where('cpf', cpf).select('cpf').first();
    if (!CPF) {
      return res.status(404).
        json({ message: 'registro not found' });
    }
    try {
      const employees = await connection('employees').where('cpf', cpf).select('*');
     //  res.header("authorization": CPF)
      return res.status(200).json(employees);
    } catch (e) {
      console.log(e);
      return res.status(502).json({ message: '502 Bad Gateway' });
    }
  },

  async readEmployeeTxt(req, res) {
    const { txtSearch } = req.params;
    const employee = await connection('employees').where('name', 'like', `${txtSearch}%`).select('*');
    try {
      if (!employee) {
        return res.status(404).json({ message: 'registro not found' });
      }
    } catch (e) {
      console.log(e)
    }
    
    return res.status(200).json(employee)
  },
 
  async updateEmployee(req
    , res) {
    const cpfAuthorization = req.headers.authorization
    const {
      name,
      email,
      whatsApp,
      Address,
    } = req.body;

    const CPF = await connection('employees').where('cpf', cpfAuthorization).select('cpf').first();
    if (!CPF) {
      return res.status(404).json({ message: 'registro not found' });
    }
    try {
       await connection('employees').where('cpf', cpfAuthorization).update( {
        name,
        email,
        whatsApp,
        Address,
      } );

    const employees = await connection('employees').where('cpf',cpfAuthorization).select('*');
      console.log( cpfAuthorization )
      return res.status(200).json([employees,{ message: "Produto alterado com sucesso :)"}]);
    } catch (e) {
      console.log(cpf);
      return res.status(502).json({ message: '502 Bad Gateway' });
    }
  },

  async deleteEmployee(req, res) {
    const cpfAuthorization = req.headers.authorization;
    const employee = await connection('employees').where('cpf', cpfAuthorization).select('cpf', 'name').first();
    try {
      if (employee.cpf === cpfAuthorization) {
        await connection('employees').where('cpf', cpfAuthorization).delete();
      return res.status(200).json({ employee, message: 'produt0 excluido da base de dados' });
      } 
    } catch(e) {
      return res.status(404).json({ message: `produto cod.:${employee} no encontrado` });
    }
    return res.send(":(")  
  }
};
