<template>
    <div class="container my-4">
      <h2 class="text-center">Administrar Tipos</h2>
      <div class="mb-3">
        <label for="tipoNombre" class="form-label">Nombre de Tipo</label>
        <input v-model="nuevoTipo" type="text" class="form-control" id="tipoNombre" required>
      </div>
      <button @click="agregarTipo" class="btn btn-primary">Agregar Tipo</button>
  
      <table class="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in types" :key="type.id">
            <td>{{ type.id }}</td>
            <td>{{ type.name }}</td>
            <td>
              <button @click="eliminarTipo(type.id)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CrudTipos',
    data() {
      return {
        nuevoTipo: '',
        types: []
      };
    },
    methods: {
      async agregarTipo() {
        try {
          const response = await axios.post('http://localhost:3001/types', { name: this.nuevoTipo });
          this.types.push(response.data);
          this.nuevoTipo = '';
        } catch (error) {
          console.error('Error al agregar tipo:', error);
        }
      },
      async eliminarTipo(id) {
        try {
          await axios.delete(`http://localhost:3001/types/${id}`);
          this.types = this.types.filter(type => type.id !== id);
        } catch (error) {
          console.error('Error al eliminar tipo:', error);
        }
      },
      async obtenerTypes() {
        try {
          const response = await axios.get('http://localhost:3001/types');
          this.types = response.data;
        } catch (error) {
          console.error('Error al obtener tipos:', error);
        }
      }
    },
    created() {
      this.obtenerTypes();
    }
  };
  </script>
  
  <style>
  /* Estilos personalizados si es necesario */
  </style>
  