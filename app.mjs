import { default as express } from 'express';
import { default as logger } from'morgan';
import { default as cookieParser } from'cookie-parser';
import * as http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import cache from "./middlewares/cacheRequest.mjs"
dotenv.config()


import {
    normalizePort, onError, onListening, handle404, basicErrorHandler
} from './appsupport.mjs';

import config from './config/config.mjs';

import { router as uploadRouter } from './routes/uploadRoute.mjs';
import { router as yahooRouter } from './routes/yahooRoute.mjs';
import { router as coinRouter } from './routes/coinRoute.mjs';
//import { sendMail } from "./mailsend.mjs";




var app = express();


//local data 

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/user', uploadRouter);
app.use("/yahooapi",yahooRouter)
app.use("/coin",cache(600),coinRouter)

// error handlers
// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(config.port);
app.set('port', port);
app.set('trust proxy', true);

export const server = http.createServer(app);

// Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true,
   useCreateIndex: true,
    useUnifiedTopology: true,
     useFindAndModify: false,
     autoIndex: true }).then(()=>{
      console.log("mongo connection established")
      server.listen(port);
     }).catch(err=>console.log(err))
mongoose.connection.on('error', () => {
  console.log(`unable to connect to database: ${config.mongoUri}`);
});


server.on('error', onError);
server.on('listening', onListening);