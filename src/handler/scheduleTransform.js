import Schedule from '../model/schedule'
export default class ScheduleHandler {
  constructor(originList) {
    this.originList = originList
  }
  origin2Schedule() {
    this.scheduleList = []

    const majorParser = (majorStr) => {
      return majorStr.split('、')
    }
    const timeParser = (timesStr) => {
      const times = timesStr.split(' ')
      const result = []
      times.forEach(element => {
        let day = element.substring(0,2)
        let timeRange = element.substring(2, element.length).split('-').map(item => {
          return parseInt(item)
        })
        for(let i = timeRange[0]; i<=timeRange[1]; i++ ) {
          result.push({day, time:i})
        }
      })
      return result
    }
    const timeIndex = this.getIndexOfName('时间')
    const courseNameIndex = this.getIndexOfName('课  程  名  称')
    const teacherIndex = this.getIndexOfName('任课      教师')
    const majorIndex = this.getIndexOfName('分班范围')
    const placeIndex = this.getIndexOfName('地点')
    const originList = this.originList
    this.scheduleList = []
    for(let i = 2, length = originList.length; i< length; i++) {
      if(originList[i].length) {
        const times = timeParser(originList[i][timeIndex])
        majorParser(originList[i][majorIndex]).forEach(item =>
          times.forEach(item1 => {
            this.scheduleList.push(new Schedule(item1.day, item1.time, originList[i][courseNameIndex],
            originList[i][teacherIndex], item))
          })
        )
        
      }
    }
    console.log(this.scheduleList)
  }
  toBookData() {
    this.bookData = {}
    this.scheduleList.forEach(item => {
      let bookDatas = this.bookData[item.major]
      if (!bookDatas) {
        bookDatas = this.bookData[item.major] = []
      }
      bookDatas.push(item)
    })
    const bookDatas = []
    const weekdays = ['周一','周二','周三','周四','周五','周六','周日']
    const genEmptySchedule = () => {
      let  rows = []
      for(let i = 0; i<13;i++) {
        rows.push(new Array(7))
      }
      console.log(rows)
      return rows
    }
    for(let key in this.bookData) {
      let bookData = {name: key, data: genEmptySchedule()}
      this.bookData[key].forEach(item => {
        console.log(item.time - 1)
        console.log(bookData.data[item.time - 1])
        console.log(item.day)
        // console.log(bookData.data, bookData.data[item.time - 1])
        bookData.data[item.time - 1].splice(weekdays.indexOf(item.day), 1, item.courseName)
      })
      bookDatas.push(bookData)
    }
    
    console.log(bookDatas)
    return bookDatas
    // console.log(this.bookData)
  }
  getIndexOfName(name) {
    return this.originList[1].indexOf(name)
  }
}