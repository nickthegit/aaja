<template>
  <div>sf</div>
</template>

<script>
// var slugify = require('slugify')
import slugify from 'slugify'
import { format, compareAsc, getTime, formatISO } from 'date-fns'
export default {
  async fetch() {
    fetch('https://aajamusic.airtime.pro/api/week-info')
      .then((response) => response.json())
      .then((data) => (this.theData = data))
  },
  data() {
    return {
      theData: '',
    }
  },
  mounted() {
    setTimeout(() => {
      console.log('this.theData', this.theData)
      let schedule = []
      for (const item of Object.entries(this.theData)) {
        let mainID =
          slugify([item[1][0].starts].toString()) +
          slugify([item[0]].toString())
        schedule.push({
          date: item[1][0].starts,
          label: item[0],
          _id: mainID,
          schedule: [...item[1]].map((day) => {
            let theSlug = slugify([day.name].toString())
            let timeFrom = formatISO(new Date([day.start_timestamp].toString()))
            console.log('timeFrom', timeFrom)
            console.log('timeFromOriginal', day.start_timestamp)
            return {
              onAir: false,
              time: {
                from: day.start_timestamp,
                to: day.end_timestamp,
              },
              name: day.name,
              _id: theSlug,
              img: false,
            }
          }),
        })
        console.log(item)
      }
      // let dave = this.theData.map((el) => {
      //   return { ...el[0].start_timestamp }
      // })

      console.log('schedule', schedule)
    }, 3000)
  },
}
</script>

<style lang="scss" scoped></style>
