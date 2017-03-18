<template lang="html">

<div class="bar-container">
  <span>Mastery</span>
   <div class="bar">
    <div class="bar-fill" :style="barWidthFromProp">

    </div>
  </div>
</div>
</template>

<script>
export default {
  props:['barWidth'],
  data:function(){
    return{

    }
  },
  computed:{
    barWidthFromProp(){
      return {width:this.barWidth/3 *100 +'%'}
    }
  }
}
</script>

<style scoped>
.bar-container{
  position:absolute;
  top:2%;
  right:10%;
}
.bar{
  height:15px;
  width:100px;
  border:1px solid #ffffff;
  padding:4px;

}
.bar-fill{
  width:0%;
  height: 5px;
  background-color: #ffffff;
  transition:all .5s ease;
}
span{
  text-transform: uppercase;
  font-size:10px;
  color:#ffffff;
}

</style>
