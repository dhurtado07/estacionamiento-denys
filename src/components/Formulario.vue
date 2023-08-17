<template>
  <div class="container my-4">
    <h2 class="text-center">Formulario</h2>
    <form @submit.prevent="guardarEmpleado" class="mx-auto p-3">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre empleado</label>
        <input v-model="empleado.nombre" type="text" class="form-control" id="nombre" required>
      </div>
      <div class="mb-3">
        <label for="area" class="form-label">Área</label>
        <select v-model="empleado.area" class="form-select" id="area" required>
          <option v-for="area in areas" :value="area.id" :key="area.id">{{ area.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="tipoVehiculo" class="form-label">Tipo de vehículo</label>
        <select v-model="empleado.tipoVehiculo" class="form-select" id="tipoVehiculo" required>
          <option v-for="type in types" :value="type.id" :key="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="numeroPlaca" class="form-label">Número de placa</label>
        <input v-model="empleado.numeroPlaca" type="text" class="form-control" id="numeroPlaca" required>
      </div>
      <div class="mb-3">
        <label for="colorVehiculo" class="form-label">Color del vehículo</label>
        <input v-model="empleado.colorVehiculo" type="text" class="form-control" id="colorVehiculo" required>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>

    <h2 class="text-center mt-4">Filtros</h2>
    <div class="mb-3 d-flex justify-content-between">
      <div class="col-md-4">
        <label for="filtroTipo" class="form-label">Filtrar por Tipo:</label>
        <select v-model="filtroTipo" class="form-select" id="filtroTipo">
          <option value="">Todos</option>
          <option v-for="type in types" :value="type.id" :key="type.id">{{ type.name }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="busquedaNombre" class="form-label">Buscar por Nombre:</label>
        <input v-model="busquedaNombre" type="text" class="form-control" id="busquedaNombre">
      </div>
    </div>

    <h2 class="text-center mt-4">Empleados</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Área</th>
          <th>Tipo de Vehículo</th>
          <th>Número de Placa</th>
          <th>Color de Vehículo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emp, index) in empleadosFiltrados" :key="index">
          <td>{{ emp.nombre }}</td>
          <td>{{ obtenerNombreArea(emp.area) }}</td>
          <td>{{ obtenerNombreTipo(emp.tipoVehiculo) }}</td>
          <td>{{ emp.numeroPlaca }}</td>
          <td>{{ emp.colorVehiculo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormularioEmpleado',
  data() {
    return {
      empleado: {
        nombre: '',
        area: 1,
        tipoVehiculo: 1,
        numeroPlaca: '',
        colorVehiculo: ''
      },
      empleados: [],
      areas: [],
      types: [],
      filtroTipo: '',
      busquedaNombre: ''
    };
  },
  methods: {
    async guardarEmpleado() {
      try {
        const response = await axios.post('http://localhost:3001/employees', this.empleado);
        this.empleados.push(response.data);
        this.empleado = {
          nombre: '',
          area: 1,
          tipoVehiculo: 1,
          numeroPlaca: '',
          colorVehiculo: ''
        };
      } catch (error) {
        console.error('Error al guardar empleado:', error);
      }
    },
    async obtenerEmpleados() {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        this.empleados = response.data;
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    },
    async obtenerAreas() {
      try {
        const response = await axios.get('http://localhost:3001/areas');
        this.areas = response.data;
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      }
    },
    async obtenerTypes() {
      try {
        const response = await axios.get('http://localhost:3001/types');
        this.types = response.data;
      } catch (error) {
        console.error('Error al obtener tipos de vehículo:', error);
      }
    },
    obtenerNombreArea(id) {
      const area = this.areas.find(area => area.id === id);
      return area ? area.name : '';
    },
    obtenerNombreTipo(id) {
      const type = this.types.find(type => type.id === id);
      return type ? type.name : '';
    }
  },
  computed: {
    empleadosFiltrados() {
      let filtrados = this.empleados;

      if (this.filtroTipo) {
        filtrados = filtrados.filter(emp => emp.tipoVehiculo === parseInt(this.filtroTipo));
      }

      if (this.busquedaNombre) {
        const busqueda = this.busquedaNombre.toLowerCase();
        filtrados = filtrados.filter(emp => emp.nombre.toLowerCase().includes(busqueda));
      }

      return filtrados;
    },
  },
  created() {
    this.obtenerEmpleados();
    this.obtenerAreas();
    this.obtenerTypes();
  },
};
</script>

<style>
/* Estilos personalizados si es necesario */
</style>
