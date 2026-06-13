# 无限滚动列表

```vue
<template>
  <ul class="list-wrap">
    <li
      v-for="(item,index) in updateList"
      :id="getIdAndRef(index)"
      :key="item.value"
      class="item"
      :style="{ top: (height * (index + startIndex)) + 'px', height: height+'px' }"
    >{{ item.value }}</li>
  </ul>
</template>

<script>
const THRESHOLD = 15
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      startIndex: 0,
      endIndex: THRESHOLD,
      observer: null
    }
  },
  computed: {
    updateList() {
      const { startIndex, endIndex } = this
      const sliceList = this.list.slice(startIndex, endIndex)
      return sliceList
    },
    // fragmentHtmlStr() {
    //   function getIdAndRef(index) {
    //     if (index === 0) {
    //       return 'top'
    //     } else if (index === THRESHOLD - 1) {
    //       return 'bottom'
    //     }
    //     return ''
    //   }
    //   const { startIndex, endIndex, height } = this
    //   const sliceList = this.list.slice(startIndex, endIndex)
    //   let htmlStr = ''
    //   sliceList.forEach((item, index) => {
    //     let id = getIdAndRef(index)
    //     if (id) {
    //       htmlStr += `<li id="${id}" :key="${item.value}" class="item" style="top: ${(height * (index + startIndex))}px; height: ${height + 'px'} ">${item.value}</li>`
    //     } else {
    //       htmlStr += `<li  :key="${item.value}" class="item" style="top: ${(height * (index + startIndex))}px; height: ${height + 'px'} ">${item.value}</li>`
    //     }
    //   })

    //   return htmlStr
    // },
  },
  watch: {
    endIndex(newVal, oldVal) {
      // console.log('endIndex', newVal, oldVal)
      // this.$nextTick(this.initIntersectionObserver)
      // 滚动过快，会出现模糊抖动现象
      setTimeout(this.initIntersectionObserver, 0)
    }
  },
  mounted() {
    this.initIntersectionObserver()
  },
  beforeDestroy() {
    this.resetObservation()
  },
  methods: {
    getIdAndRef(index) {
      if (index === 0) {
        return 'top'
      } else if (index === THRESHOLD - 1) {
        return 'bottom'
      }
    },
    resetObservation() {
      if (document.getElementById("top")) {
        this.observer && this.observer.unobserve(document.getElementById("top"))
      }
      if (document.getElementById("bottom")) {
        this.observer && this.observer.unobserve(document.getElementById("bottom"))
      }
    },
    initIntersectionObserver() {
      // 滚动过快，会出现模糊抖动现象
      setTimeout(() => {
        this.resetObservation()
        const observer = this.observer = new IntersectionObserver(this.callback, {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
        })
        if (document.getElementById("top")) {
          observer.observe(document.getElementById("top"))
        }
        if (document.getElementById("bottom")) {
          observer.observe(document.getElementById("bottom"))
        }
      }, 10)
    },
    callback(entries, observer) {
      const listlen = this.list.length
      // console.log(1111, document.getElementById("top"), document.getElementById("bottom"))
      entries.forEach((entry, index) => {
        // 用户上滑或者向上滚动
        if (entry.isIntersecting && entry.target.id === 'top') {
          const startIndex = this.startIndex
          const newStartIndex = startIndex === 0 ? 0 : (startIndex - 5 > 0 ? startIndex - 5 : 0)
          // const endIndex = this.endIndex
          // const newEndIndex = endIndex === THRESHOLD ? THRESHOLD : (endIndex - 10 > THRESHOLD ? endIndex - 10 : THRESHOLD)
          const maxEndIndex = listlen - 1
          const newEndIndex = startIndex === 0 ? THRESHOLD : (startIndex + 10 > maxEndIndex ? maxEndIndex : startIndex + 10)
          this.startIndex = newStartIndex
          this.endIndex = newEndIndex
        } else if (entry.isIntersecting && entry.target.id === 'bottom') {
          const maxEndIndex = listlen - 1
          const maxStartIndex = listlen - 1 - THRESHOLD
          const endIndex = this.endIndex
          const newEndIndex = endIndex + 10 < maxEndIndex ? endIndex + 10 : maxEndIndex
          const newStartIndex = endIndex - 5 < maxStartIndex ? endIndex - 5 : maxStartIndex
          this.startIndex = newStartIndex
          this.endIndex = newEndIndex
        }
      })
    }
  }
}
</script>

<style>
.list-wrap {
  position: relative;
  list-style: none;
  padding: 0 10px 0 5px;
}
.list-wrap .item {
  width: 100%;
  border: 1px solid rebeccapurple;
  text-align: center;
  position: absolute;
  /* font-size: 24px; */
}
</style>
```