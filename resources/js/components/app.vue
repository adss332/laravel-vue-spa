<template>
	<div class="container">
	<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
   
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :to="{name:'home'}">Home</router-link>
		<router-link :to="{name:'about'}">About</router-link>
		<router-link :to="{name:'desks'}">Desks</router-link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
		<p>
		
		</p>
		<div>
		  <router-view></router-view>
		</div>
	</div>

</template>
<script>

	export default{

	}
</script>