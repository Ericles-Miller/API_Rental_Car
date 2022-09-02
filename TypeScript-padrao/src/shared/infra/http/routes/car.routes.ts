import { CreateCarController } from "@modules/car/UseCases/createcar/CreateCarController";
import { Router } from "express";

const CarsRoutes = Router();

let createCarController = new CreateCarController();

CarsRoutes.post("/",createCarController.handle);

export{CarsRoutes}
