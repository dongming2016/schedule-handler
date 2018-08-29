import DataHandler from './src/handler/dataHandler'
import ScheduleHandler from './src/handler/scheduleTransform'
const dataHandler = new DataHandler('./18-19第一学期学术型硕士研究生课表.xls')
dataHandler.getAllData()
dataHandler.getBookDataByIndex(0)
dataHandler.getRowDatas()
const scheduleHandler = new ScheduleHandler(dataHandler.getRowDatas())
console.log(scheduleHandler.origin2Schedule())
// console.log(scheduleHandler.toBookData())
dataHandler.writeData(scheduleHandler.toBookData())