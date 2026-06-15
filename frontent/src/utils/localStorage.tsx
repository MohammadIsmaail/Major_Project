export const storeData =(key:any,value:any)=>{
   const data = JSON.stringify(value)
   localStorage.setItem(key,data)

} 