<template>
  <div>
    <h1>Formulario de Empleado</h1>
    <employee-form :employee="newEmployee" :areas="areas" :types="types" @add-employee="addEmployee" />

    <h1>CRUD de Empleados</h1>
    <employee-table :employees="employees" :areas="areas" :types="types" />
  </div>
</template>

<script>
import EmployeeForm from '../components/EmployeeForm.vue';
import EmployeeTable from '../components/EmployeeTable.vue';
import axios from 'axios';

export default {
  components: {
    EmployeeForm,
    EmployeeTable,
  },
  data() {
    return {
      newEmployee: {
        name: '',
        areasId: '',
        typesId: '',
        placa: '',
        color: '',
      },
      employees: [],
      areas: [],
      types: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/db.json');
        this.employees = response.data.employees;
        this.areas = response.data.areas;
        this.types = response.data.types;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async addEmployee(employee) {
      try {
        const response = await axios.post('/employees', employee);
        this.employees.push(response.data);
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },
  },
};
</script>
