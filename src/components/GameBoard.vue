<template lang="html">
<div>  <transition @enter="flipYEnter" @leave="flipYLeave" :css="false" ><div  ref="panel" class="panel panel-default" v-show="!betweenRounds" :style="">
    <div class="panel-heading" :style="heading">
      <h3>{{randomQA.term}}
        <transition @enter="fadeEnter" @leave="fadeLeave" :css="false"><mastery-bar :barWidth="randomQA.mastery" v-if="showMastery"></mastery-bar></transition></h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-6" v-for="answer in answers">
          <button type="button" class="btn-default btn" name="button"  :key="answer.answer" @click="checkAnswer" :value='answer.answer' :disabled="answerChosen" :style="buttonStyles">{{answer.answer}}</button>
        </div>
      </div>
    </div>
  </div>
</transition></div>
</template>

<script>
import {
    AnimationMixin
} from '../mixins/animations.js';
import {
    eventBus
} from '../main.js';
import MasteryBar from './MasteryBar.vue';
export default {
    // props: ['qa-objects'],
    mixins: [AnimationMixin],
    components: {
        masteryBar: MasteryBar
    },
    data: function() {
        return {
            answers: [],
            randomQA: null,
            showMastery: false,
            betweenRounds: false,
            answerChosen: false
        }
    },
    events: {
        incorrectAnswer: function() {
            console.log("incorrect");
        }
    },
    created() {
        this.qaObjects = eventBus.$data.qaObjects;
        this.setStage();
        eventBus.$on('incorrectAnswer', () => {
            console.log("incorrect");
            console.log(eventBus);
        })

    },
    destroyed(){
      eventBus.$off('incorrectAnswer');
    },
    computed:{
      buttonStyles(){
        if(this.answerChosen){
                  return {'background-color':'#ffffff' }
        }
        return;
      },
      heading(){
        if(this.answerChosen){
          return {'background-color':'#62d5b3','transition':'.5s ease all'}
        }
      }
    },
    methods: {
        setStage() {
            let answers = [];
            let count = 0;
            let viableQuestions = this.qaObjects.filter(qaObject => qaObject.mastery < 3);
            let answerObj = {};
            this.randomQA = viableQuestions[this.random(1, viableQuestions.length)];
            answerObj.answer = this.randomQA.def;
            answerObj.correct = true;
            this.answers.push(answerObj);
            let vm = this;
            let findRandomAnswer = function() {
                let incorrectAnswer = {};
                let potential = vm.qaObjects[vm.random(1, viableQuestions.length)];
                incorrectAnswer.answer = potential.def === vm.randomQA.def ? null : potential.def;
                incorrectAnswer.correct = false;
                if (incorrectAnswer.answer) {
                    vm.answers.push(incorrectAnswer);
                    if (vm.answers.length < 4) {
                        findRandomAnswer();
                    } else {
                        return;
                    }
                } else {
                    findRandomAnswer();
                }
            }
            findRandomAnswer();
            vm.answers = this.shuffle(vm.answers);
        },
        checkAnswer(el) {
            if (el.target.value === this.randomQA.def) {
              this.answerChosen = true;
                eventBus.$emit('correctAnswer', this.randomQA);
                this.qaObjects.map(object => {
                    if (object.id === this.randomQA.id) {
                        setTimeout(() => {
                            object.mastery++;
                        }, 500);
                        setTimeout(() => {
                            this.betweenRounds = true;
                            eventBus.$emit('roundOver', true)
                        }, 2000);
                    }
                })
                this.showMastery = true;
            } else {
                eventBus.$emit('incorrectAnswer', this.randomQA);
                let tl = new TimelineMax();
                TweenMax.fromTo(this.$refs.panel, .3, {x:-10},{x:10, ease:RoughEase.ease.config({strength:8, points:20, template:Linear.easeNone, randomize:false}) , clearProps:"x"})

            }
        }
    }
}
</script>

<style scoped>
.btn {
    padding: 40px;
    margin: 15px;
}
</style>
