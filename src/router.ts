/*
 |-------------------------------------------------------------------
 |  router.ts - Defination of rountes goes here
 |-------------------------------------------------------------------
 */

import { Application } from "express";

import controllers from "./controllers";

export class Router {

  //Constructor For applicatin
  constructor(private application: Application) {}

  //Association of rounters goes here
  public associate() {
    
    this.application.get("/cloudcosting", controllers.ComputeController.index);
    this.application.get("/resources", controllers.ComputeController.getResources);
    this.application.get("/applications", controllers.ComputeController.getApplications);

  }
}
