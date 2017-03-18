export const AnimationMixin = {
  data: function(){
    return {

    }
  },
  created(){
    console.log("mixin successful")
  },
  methods:{
    random(min, max) {
        return Math.floor(Math.random() * (max - min)+min);

    },
    shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    fadeEnter(el, done) {
        console.log('enter');
        let tl = new TimelineMax();
        tl.from(el, .5, {
            opacity: 0,
            onComplete: done
        });
    },
    fadeLeave(el, done) {
        console.log('leave');
        let tl = new TimelineMax();
        tl.to(el, .5, {
            opacity: 0,
            onComplete: done
        });

    },
    slideEnter(el, done) {
        console.log('enter');
        let tl = new TimelineMax();
        tl.from(el, .5, {
            opacity: 0,
            y:-50,
            onComplete: done
        });
    },
    slideLeave(el, done) {
        console.log('leave');
        let tl = new TimelineMax();
        tl.to(el, .5, {
            opacity: 0,
            y:-50,
            onComplete: done
        });

    },
    flipYEnter(el,done){
      let tl = new TimelineMax();
      tl.from(el, .5, {
          opacity: 0,
          rotationY:180,
          onComplete: done
      });
    },
    flipXEnter(el,done){

      let tl = new TimelineMax();
      tl.from(el, .5, {
          opacity: 0,
          rotationX:180,
          onComplete: done
      });
    },
    flipYLeave(el,done){
      let tl = new TimelineMax();
      tl.to(el, .5, {
          opacity: 0,
          rotationY:180,
          onComplete: done
      });
    },
    flipXLeave(el,done){
      let tl = new TimelineMax();
      tl.to(el, .5, {
          opacity: 0,
          rotationX:180,
          onComplete: done
      });
    }
  }

}
