import { app } from "./app.js";
import { checkConnection } from "./config/db.js";
import { config } from "./config/index.js";


async function start() {
  try{
    if(await checkConnection()){
      console.log("DB status: Ready!!!")
    }else{
      console.log("DB status: not set!!!!!!!")
    }
    
    app.listen(config.port, ()=>{
      console.log(`Listening on port ${config.port}`)
    })
  }catch(err){
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()