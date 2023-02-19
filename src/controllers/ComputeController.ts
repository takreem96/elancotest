import { Request, Response } from "express";
import ComputeManager from "../core/ComputeManager";
import { IController } from "./IController";

export default class ComputeController implements IController{

    index(request: Request, response: Response): void {
        const query: any = request.query;
        console.log("body", query);

        const page      = query['page'] == undefined ? 0 : parseInt(query['page']);
        const page_size = query['page_size'] == undefined ? 15 : parseInt(query['page_size']);
        const search_query = query['search_query'] == undefined ? null : query['search_query'];
        const filtertype = query['filtertype'] == undefined ? null : query['filtertype'];
       
        const sort_by = query['sort_by'] == undefined ? null : query['sort_by'];
        const sort_type = query['sort_type'] == undefined ? null : query['sort_type'];

        
        if(filtertype != null && filtertype != "" && !(filtertype == "applications" || filtertype == "resources" )){
            response.status(400);
            response.json({message: "invalid filter type"});
        }
        if(filtertype != null && filtertype != "" && (search_query == null || search_query == "")){
            response.status(400);
            response.json({message: "search_query can't be empty in the case of filtertype chosen."});
        }


        const Computingmgr :ComputeManager = ComputeManager.instance();
        Computingmgr.fetch(filtertype, search_query, page, page_size, sort_by, sort_type).then(res => {
            response.status(200);
            response.json(res);
        })
        .catch(err=> {
            response.status(500);
            response.json(err);
        })
       
    }

    getResources(request: Request, response: Response): void {
        const Computingmgr :ComputeManager = ComputeManager.instance();
        Computingmgr.getResources().then(res => {
            response.status(200);
            response.json(res);
        })
        .catch(err=> {
            response.status(500);
            response.json(err);
        })
    }

    getApplications(request: Request, response: Response): void {
        const Computingmgr :ComputeManager = ComputeManager.instance();
        Computingmgr.getApplications().then(res => {
            response.status(200);
            response.json(res);
        })
        .catch(err=> {
            response.status(500);
            response.json(err);
        })
    }
    

    store(request: Request, response: Response): void {
        throw new Error("Method not implemented.");
    }

    show(request: Request, response: Response): void {
        throw new Error("Method not implemented.");
    }

    update(request: Request, response: Response): void {
        throw new Error("Method not implemented.");
    }

    delete(request: Request, response: Response): void {
        throw new Error("Method not implemented.");
    }
}