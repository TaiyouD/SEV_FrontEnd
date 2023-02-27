<!-- Component will be a wrapper that will contain a single slot.
Use this component to pass several individual Tab.vue components for each different piece. -->

<template lang="html">
    <div v-show="isActive">
      <slot></slot>
    </div>
  </template>
  
  <script>
    export default {
      props: {
        title: {
          type: String,
          default: 'Tab'
        }
      },
      data () {
        return {
          isActive: true
        }
      }
    }
  </script>

<style lang="css"> 
    

</style>
  