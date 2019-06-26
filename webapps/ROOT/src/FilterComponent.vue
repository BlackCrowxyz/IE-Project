<template>
<div>
  <select v-model="selected" class="custom-select w-sm-50 w-md-50 w-lg-25">
    <option value="" disabled>
      مرتب سازی براساس...
    </option>
    <option v-for="option in options" :value="option.value">
      {{option.name}}
    </option>
  </select>
  <!-- <span>{{selected}}</span> -->
</div>
</template>

<script>
export default {
  name: 'progress-component',
  data() {
    return {
      // showOrNot: false,
      options: [{
          name: 'نام کاربری',
          value: 'username'
        },
        {
          name: 'جدیدترین',
          value: 'date'
        },
        {
          name: 'مسؤل',
          value: 'responsible'
        },
      ],
      selected: '',
    }
  },
  updated() {
    this.$parent.filter = this.selected
    this.$parent.filterLits()
  },
}
</script>
