<template>
	<div class="container">
		<div class="form-group">
			<h1>{{name}}</h1>
			<input @blur="saveName" v-model="name" type="text" class="form-control" :class="{'is-invalid':v$.name.$error}">
			<div class="invalid-feedback" v-if="!v$.name.required.$response">
				Required field.
			</div>

			<div class="invalid-feedback"  v-if="v$.name.required.$response && !v$.name.maxLength.$response">
				Max symbols: {{v$.name.maxLength.$params.max}}.
			</div>
		<div class="row">
    <div class="row col-lg-4" v-for="desk_list in desk_lists">
    	
    	<div class="card mt-3" >
       
       	<a href="#" class="card-body"><h5 class="card-title">{{desk.name}}</h5></a>

</div>
    </div>

    </div>
		</div>

<form @submit.prevent="addNewDeskList">
		<div class="form-group mt-3">
        <input type="text" v-model="desk_list_name" class="form-control" :class="{'is-invalid':v$.desk_list_name.$error}" placeholder="Введите название списка">
        <div class="invalid-feedback" v-if="!v$.desk_list_name.required.$response">
				Required field.
			</div>

			<div class="invalid-feedback"  v-if="v$.desk_list_name.required.$response && !v$.desk_list_name.maxLength.$response">
				Max symbols: {{v$.desk_list_name.maxLength.$params.max}}.
			</div>
		</div>

		<button type="submit" class="btn btn-primary mt-3">Добавить список</button>
		</form>
	 <div class="alert alert-danger mt-3" role="alert" v-if="errored" >Ошибка загрузки данных
	 <br>
	{{errors[0][0]}}</div>
	
<div class="d-flex justify-content-center" v-if="loading">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
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
	
	props: [
    'deskId'
	],
     data(){
     return {
     name:null,
     desk_list_name:null,
     errors:[],
	 errored:false,
	 loading:true,
	 desk_lists:true,
 }
 },
 methods: {

 getDeskLists(){
 axios.get('/api/desks-lists/', {
 	params:{
     desk_id:this.deskId,
 	}
 	
 	})
		 .then(response => {
		 	this.desk_lists = response.data.data;
		 })
		 .catch(error => {
		 	this.errored = true;
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
 },
 saveName(){
 	this.v$.$touch()
 	if (this.v$.$error){
 		console.log(this.v$.$error);
 		return;
 	}
 	axios.post('/api/desks/' + this.deskId, {
 		_method:'PUT',
 		name: this.name,
 	})
		 .then(response => {
		 	this.name = response.data.data.name;
		 	
		 })
		 .catch(error => {
		 	this.errors = [];
		 	this.errors.push(error.response.data.errors.name)
		 	this.errored = true
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
 },
 addNewDeskList(){
        this.v$.$touch()
 	    if (this.v$.$error){
 		console.log(this.v$.$error);
 		return;
 	    }
 	    axios.post('/api/desk-lists', {
 		name: this.desk_list_name,
 		desk_id:this.deskId,
 	    })
		 .then(response => {
		 	this.desk_list_name = '';
		 	this.desks_lists = [];
		 	this.getDesksLists();
		 })
		 .catch(error => {
		 	this.errors=[];
		 	console.log(error);
		 	this.errored = true
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
		},
 },
 mounted(){
 axios.get('/api/desks/' + this.deskId)
		 .then(response => {
		 	this.name = response.data.data.name;
		 })
		 .catch(error => {
		 	console.log(error);
		 	this.errored = true
		 })
		 .finally(()=>{
		 	this.loading = false;
		 })
this.getDeskLists();
},
validations(){
	return {
	name: {required,
    maxLength:maxLength(250),
	},
	desk_list_name: {required,
    maxLength:maxLength(250),
	},
}
},

}
</script>