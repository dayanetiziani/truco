import express from "express";
import EquipeController from "../controllers/equipeController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js"; 

const router = express.Router();
const ctrl = new EquipeController();
let auth = new AuthMiddleware(); 

router.get('/', auth.validar, (req,res) => {
    ctrl.listar(req,res);
     //#swagger.tags = ['Equipes'] 
    //#swagger.summary = 'Endpoint para listar equipes'
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
});

router.post("/", auth.validar, (req,res) => {
   ctrl.gravar(req,res) ;
   //#swagger.tags = ['Equipes'] 
   //#swagger.summary = 'Endpoint para criar uma equipe'
   /* #swagger.security = [{
        "bearerAuth": []
    }]*/
});

router.get("/:eqp_id",auth.validar, (req,res) => {
    ctrl.buscarPorId(req,res);
    //#swagger.tags = ['Equipes'] 
    //#swagger.summary = 'Endpoint para buscar uma equipe'
    /* #swagger.security = [{
        "bearerAuth": []
    }]*/
});

export default router;