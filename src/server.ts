/*
 |-------------------------------------------------------------------
 |  server.ts - File for server defination
 |-------------------------------------------------------------------
 |  File contains the class to manage the server. It consist of logic
 |  for bootstraping of server and Middleware initization and biniding
 |  with server port.
 |
 */
import * as express from "express";
import * as http from "http";
import * as bodyparser from "body-parser";
import * as cors from "cors";
import { Router } from "./router";

export class Server {
  private server: http.Server = null;
  private app: express.Application = null;
  private router: Router = null;

  constructor(private port: string) {
    if (port == null || port == undefined) {
      throw new Error("Port not provided.");
    }
    this.port = port;
    this.bootstarp();
  }

  //Bootstarping the server
  private bootstarp(): void {

    //Initializing the express
    this.app = express();

    this.server = new http.Server(this.app);
    this.app.use(bodyparser.urlencoded({ extended: false, limit: "50mb" }));
   
    // parse application/json
    this.app.use(bodyparser.json());

    this.app.use(cors())
    
    this.app.use(function (req, res, next) {
      
        res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, HEAD, DELETE"
      );
      res.header("Access-Control-Expose-Headers", "Content-Length");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language"
      );
    
       next();
    });  
    
    this.router = new Router(this.app); 

    //Associating the routers to application
    this.router.associate();

    // Handle 404
    this.app.use(function (req, res) {
      res.status(404);
      res.send("404: Page not Found");
    });

    // Handle 500
    this.app.use(function (error, req, res, next) {
      res.status(500);
      res.send("500: Internal Server Error");
    });
  }

  //Running the server
  public run(): void {
    var me = this;
    if (this.server == null) {
      throw new Error("Express application is not initialized.");
    }

    this.server.listen(this.port, function () {
      console.log("Application started on port " + me.port);
    });
  }
}
