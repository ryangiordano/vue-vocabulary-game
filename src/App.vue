<template>
<div class="container">
    <div class="row" >
        <div class="col-md-8 col-md-offset-2" style="text-align:center;">
            <h1 class="">
                {{gameState}}
            </h1>
            <br>
            <transition appear @enter="fadeEnter" @leave="fadeLeave" :css="false">
                <game-controls @startGame="startGame"></game-controls>
            </transition>
          <transition mode="out-in"  @enter="flipYEnter" @leave="fadeLeave"><component :is="activeComponent"  v-if="gameStarted"  :qa-objects="qaObjects"></component></transition>
        </div>
    </div>
</div>
</template>
<script>
import {AnimationMixin} from './mixins/animations.js';
import GameBoard from './components/GameBoard.vue';
import GameControls from './components/GameControls.vue';
import Loading from './components/Loading.vue';
import {eventBus} from './main';
export default {
    data: function() {
        return {
            gameState: "Vocabulary Game",
            qa: [
                ['船酔い', 'seasickness'],
                ['独居老人', 'elderly person living alone'],
                ['お世話をしたくない', 'don\'t want to take care of someone'],
                ['廊下', 'corridor'],
                ['奥の方', 'over there'],
                ['寝転ぶ', 'lie down'],
                ['思い出せない', 'forget'],
                ['停電', 'blackout'],
                ['寝ぼける', 'sleep walk'],
                ['車を借りて', 'rent a car'],
                ['選挙', 'election'],
                ['途中報告', 'middle report'],
                ['面白おかしく話す', 'Talking humorously about'],
                ['握手', 'handshake'],
                ['愛情', 'affection'],
                ['以心伝心', 'Read someone\'s mind']
            ],
            qaObjects: [],
            gameStarted: false,
            activeComponent: 'game-board'
        }
    },
    mixins:[AnimationMixin],
    methods: {
        qaToObj() {
            let id = 0;
            this.qa.map(entry => {
                let obj = {};
                obj['term'] = entry[0];
                obj['def'] = entry[1];
                obj['id'] = id;
                obj['mastery'] = 0;
                this.qaObjects.push(obj);
                id++;
            });
            eventBus.$data.qaObjects = this.qaObjects;
        },
        startGame() {
            console.log("Game started from app vue", this.gameStarted);
            this.gameStarted = true;
        }
    },
    created() {
        this.qaToObj();
        eventBus.$on('roundOver', ()=>{
          this.activeComponent = 'loading';
          setTimeout(()=>{
            eventBus.$emit('newRound');
            this.activeComponent = 'game-board';
          },2000)
        })
    },
    components: {
        gameBoard: GameBoard,
        gameControls: GameControls,
        loading: Loading
    }

}
</script>

<style>

</style>
