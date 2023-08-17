<template>
    <div class="container my-4">
      <h2 class="text-center">Administrar Áreas</h2>
      <div class="mb-3">
        <label for="areaNombre" class="form-label">Nombre de Área</label>
        <input v-model="nuevaArea" type="text" class="form-control" id="areaNombre" required>
      </div>
      <button @click="agregarArea" class="btn btn-primary">Agregar Área</button>
  
      <table class="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="area in areas" :key="area.id">
            <td>{{ area.id }}</td>
            <td>{{ area.name }}</td>
            <td>
              <button @click="eliminarArea(area.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CrudAreas',
    data() {
      return {
        nuevaArea: '',
        areas: []
      };
    },
    methods: {
      async agregarArea() {
        try {
          const response = await axios.post('http://localhost:3001/areas', { name: this.nuevaArea });
          this.areas.push(response.data);
          this.nuevaArea = '';
        } catch (error) {
          console.error('Error al agregar área:', error);
        }
      },
      async eliminarArea(id) {
        try {
          await axios.delete(`http://localhost:3001/areas/${id}`);
          this.areas = this.areas.filter(area => area.id !== id);
        } catch (error) {
          console.error('Error al eliminar área:', error);
        }
      },
      async obtenerAreas() {
        try {
          const response = await axios.get('http://localhost:3001/areas');
          this.areas = response.data;
        } catch (error) {
          console.error('Error al obtener áreas:', error);
        }
      }
    },
    created() {
      this.obtenerAreas();
    }
  };
  </script>
  
  <style>
  /* Estilos personalizados si es necesario */
  </style>
  