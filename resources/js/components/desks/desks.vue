<template>
	
	<div class="container">
		
		<h1>
			Доски
		</h1>
		<form @submit.prevent="addNewDesk">
		<div class="form-group">
        <input type="text" v-model="name" class="form-control" :class="{'is-invalid':v$.name.$error}" placeholder="Название доски">
        <div class="invalid-feedback" v-if="!v$.name.required.$response">
				Required field.
			</div>

			<div class="invalid-feedback"  v-if="v$.name.required.$response && !v$.name.maxLength.$response">
				Max symbols: {{v$.name.maxLength.$params.max}}.
			</div>
		</div>

		<button type="submit" class="btn btn-primary mt-3">Добавить</button>
		</form>
 <div class="alert alert-danger mt-3" role="alert" v-if="errored" >Ошибка загрузки данных 
 	<br>
 {{errors[0][0]}}
 </div>
 <div class="row">
    <div class="row col-lg-4" v-for="desk in desks">
    	
    	<div class="card mt-3" >
       <router-link class="card-body" :to="{name:'ShowDesk',params:{deskId: desk.id}}">
       	<h5 class="card-title">{{desk.name}}</h5>
       </router-link>
       <button type="button" class="btn btn-danger mt-3" @click="deleteDesk(desk.id)">Удалить</button>
  
</div>
    </div>

    </div>
  
	</div>
<div class="d-flex justify-content-center" v-if="loading">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
	export default {
	setup () {
    return { v$: useVuelidate() }
  },
		data(){
			return {
				desks:[],
				name:null,
				errors:[],
				errored:false,
				loading:true
			}
		},

		mounted(){
		 this.getAllDesks();
		},
		methods: {
		addNewDesk(){
        this.v$.$touch()
 	    if (this.v$.$error){
 		console.log(this.v$.$error);
 		return;
 	    }
 	    axios.post('/api/desks', {
 		name: this.name,
 	    })
		 .then(response => {
		 	this.name = '';
		 	this.desks = [];
		 	this.getAllDesks();
		 })
		 .catch(error => {
		 	this.errors=[];
		 	this.errors.push(error.response.data.errors.name)
		 	console.log(error);
		 	this.errored = true
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
		},
		getAllDesks(){
			axios.get('/api/desks')
		 .then(response => {
		 	this.desks = response.data.data;
		 })
		 .catch(error => {
		 	console.log(error);
		 	this.errored = true
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
		},
        deleteDesk(id){
        if(confirm('Вы точно хотите удалить эту доску?')){
        axios.post('/api/desks/' + id, {
        	_method: 'DELETE',

        } )
		 .then(response => {
		 	this.desks = []
		 	this.getAllDesks()
		 })
		 .catch(error => {
		 	console.log(error);
		 	//this.errored = true
		 	this.desks = []
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
        }
        }
		},
	validations(){
	return {
	name: {required,
    maxLength:maxLength(250),
	},
}
}
	}
</script>