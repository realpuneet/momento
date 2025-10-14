const Redis = require("ioredis");

const cacheClient = new Redis(process.env.REDIS_HOST);

cacheClient.on("connect", () => {
    console.log("Redis Connected Successfully");
});

cacheClient.on("error", (err)=>{
    console.log("Redis Connection Error :", err);
    
})

module.export = cacheClient;