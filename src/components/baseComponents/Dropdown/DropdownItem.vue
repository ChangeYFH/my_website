<template>
  <div class="dropdown-item" :class="{'disabled':disabled}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .disabled.dropdown-item * {
    color:gray !important;
    pointer-events:none !important;
  }
  .dropdown-item{
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position:relative;
    z-index:1;
  }
</style>
