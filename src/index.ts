/*
 |-----------------------------------------------------------------
 |  index.ts    - Start point of application.
 |-----------------------------------------------------------------
 |
 */
//Including the dependencies for server
import {Server} from './server';
 
var server:Server;

try{
    //Setting up the server
    server      =   new     Server('3030');
    server.run();
} catch(e){
    console.log(e);
    process.exit(0);
}


