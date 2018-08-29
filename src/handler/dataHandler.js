import xlsx from 'node-xlsx'
import  fs from 'fs'

export default class DataHandler {
  constructor(path) {
    this.path = path
  }
  getAllData() {
    this.data = xlsx.parse(this.path)
  }
  getBookDataByIndex(index) {
    if (!this.data) {
      this.getAllData()
    }
    this.bookData = this.data[index]
  }
  getRowDatas(bookIndex = 0) {
    if(!this.bookData) {
      this.getBookDataByIndex(bookIndex)
    }
    console.log(this.bookData.data[1])
    return this.bookData.data
  }
  writeData(data) {
    const buffer = xlsx.build(data)
    fs.writeFile('c:/program1/schedule.xls', buffer, err=>{
      if (err)
        throw err;
    console.log('Write to xls has finished')
    })
  }
}