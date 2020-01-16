class Common {
    static switchBodytItem(data){
        var newData = {};
        for(let item in data){
            newData[item] = data[item] == "" && item !='keyWord' ? -1 : data[item]
            console.log(newData[item])
        }
        return newData
    }
}
module.exports = Common