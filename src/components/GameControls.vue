<template lang="html">
<div style="margin-bottom: 15px;min-height: 40px;">
  <button type="button" name="button" class="btn-default btn" @click="startGame" v-if="!gameStarted">Start</button>
<transition @leave="fadeLeave" @enter="fadeEnter"><h3 @correctAnswer='correctAnswer'>{{message}}</h3></transition>
</div>
</template>

<script>
import {eventBus} from '../main.js';
import {AnimationMixin} from '../mixins/animations.js'
export default {
  mixins:[AnimationMixin],
  data:function(){
    return{
      gameStarted: false,
      message: null,
      successMessages: ['BOOM! Headshot!', 'You got it!', 'She called me Sparticus...I\'ll take it!', 'Correct!'],
      failMessages: ['BRAAAAAY', 'What is this shit?  No!', 'Nice try, but no cigar', 'Wrng', 'So close...jk you were way off.']
    }
  },
  methods:{
    startGame(){
      this.$emit('startGame',true);
      this.gameStarted = true;
      this.message = "Select the correct answer."
    },
    correctAnswer(){
      this.message = this.successMessages[this.random(0,this.successMessages.length)];
    }
  },
  created(){
    eventBus.$on('correctAnswer', this.correctAnswer);
    eventBus.$on('newRound', ()=>{
      this.message = 'Select the correct answer';
    })
  }
}
</script>

<style scoped>
h3{
  transition:.5s ease all;
}
</style>
