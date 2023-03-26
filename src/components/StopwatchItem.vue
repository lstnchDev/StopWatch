<template>
  <div class="item">
    <div class="time">{{ time }}</div>
    <hr>
    <div class="buttons">
      <img class="btn" :src="activeIcon"  @click="toggleTimer" alt="">
      <img class="btn" src="../assets/icons/stop.svg"  @click="reset" alt="">

    </div>
    <div class="overlay" :class="{active: isActive}">
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { changeItem } from '../utils/secondsData'
export default {
  name: 'StopwatchItem',
  props: {
    seconds: Number,
    index: Number,
  },

  setup(props) {
    let interval
    let isActive = ref(false)
    let seconds  = ref(props.seconds)
    const time = computed(() => {
      const hours = Math.floor(seconds.value / 3600)
      const minutes = Math.floor((seconds.value % 3600) / 60)
      const second = Math.floor(
        (seconds.value - (hours * 360 + minutes * 60)) % 60
      );
      if (hours === 0 && minutes === 0) return `${second}`
      else if (hours === 0) return `${minutes}:${second}`
      else return `${hours}:${minutes}:${second} `
    })
    const start = () => {
      interval = setInterval(() => {
        seconds.value++;
        changeItem(seconds.value, props.index)
      }, 1000)
    }

    const stop = () => {
      clearInterval(interval)
    };

    const reset = () => {
      seconds.value = 0
      changeItem(seconds.value, props.index)

      clearInterval(interval)
      isActive.value = false
    }
    const activeIcon = computed(()=> isActive.value 
      ? require("../assets/icons/pause.svg") 
      : require("../assets/icons/start.svg"))
    const toggleTimer = ()=>{
      isActive.value = !isActive.value
      isActive.value ? start() : stop()
    }
    
    return {
      start,
      stop,
      reset,
      time,
      isActive,
      activeIcon,
      toggleTimer,
    };
  },
}
</script>

<style scoped>

hr {
  background-color: #FFFFFF;
  margin: 0;
}
.time{
  font-size: 22px;
  padding: 20px 0;

}
.buttons{
  max-width: 85px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px;
}
.btn{
  cursor: pointer;
  fill: white;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #9e9e9e9c;
  z-index: 1; 
  pointer-events: none;

}
.active{
  display: none;
}
</style>
