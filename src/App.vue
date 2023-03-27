<template>
  <div class="app">
    <div class="container">
    <div class="item" v-for="(seconds, index) in items" :key="index">
        <StopwatchItem :index="index" :seconds="seconds"/>
        <img class="btnRemove" src="./assets/icons/delete.svg"  @click="remove(index)" alt="">

    </div>
    <button class="btnAdd" @click="addItem">+</button>
  </div>

  </div>
</template>

<script>
import { computed, ref } from "vue"
import StopwatchItem from "./components/StopwatchItem.vue"
import { getSeconds, setSeconds, deleteItem } from "./utils/secondsData"

export default {
  components: {
    StopwatchItem
  },
  setup() {
    const secondsArr = ref(getSeconds())
   
    const addItem = () =>{
      setSeconds()
      secondsArr.value = getSeconds()

    }
    const items = computed(() =>{
      console.log(secondsArr.value)

      return secondsArr.value
    })
    const remove = (index) =>{
      deleteItem(index)
      secondsArr.value = secondsArr.value.filter((i, indx)=> indx !== index)
    }
    return {
      addItem,
      items,
      remove
    }
  },
}
</script>

<style>
html, body {  
  margin: 0;
  height: 100%;
  background-color: #353638;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  max-width: 775px;
  margin: 0 auto;
  display: flex;
  gap: 45px 50px;
  flex-wrap: wrap;
  
}

.item {
  box-sizing: border-box;
  background-color: #696969;
  color: white;
  width: 225px;
  height: 120px;
  position: relative;
  text-align: center;
}


.btnAdd {
  box-sizing: border-box;
  background-color: #696969;
  color: white;
  width: 225px;
  height: 120px;
  text-align: center;
  font-size: 46px;
  border: none;
  cursor: pointer;
}
.btnRemove{
  position: absolute;
  top: 5%;
  right: 5%;;
  cursor: pointer;

}
@media (max-width: 1024px) {
  .container{
    max-width: 500px;
  }
}
@media (max-width: 768px) {
  .container{
    max-width: 225px;
  }
}
</style>
