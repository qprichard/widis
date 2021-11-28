import express, {RequestHandler} from "express";
import {Courier} from "../models/courier";
import {BadRequest} from "http-errors";
import {courierService} from "../services/courier";

export const courierRouter = express.Router();

const listAll: RequestHandler<void, Courier[]> = async (req, res, next) => {
    courierService.listAll()
        .then((couriers) => res.json(couriers))
        .catch((e) => next(e));
};

const getCourierById: RequestHandler<{ id: number; }, Courier> = ({params}, res, next) => {
    const {id} = params;
    if (isNaN(id)) {
        return next(new BadRequest('id param should be a number.'));
    }
    courierService.getById(id)
        .then((courier) => res.json(courier))
        .catch((e) => next(e));
};

const createCourier: RequestHandler<void, Courier, Courier> = ({body}, res, next) => {
    let {id, current_load, max_capacity} = body;
    if(isNaN(id) || isNaN(max_capacity)) {
        return next(new BadRequest('id, current_load and max_capacity params should be numbers.'));
    }

    if(isNaN(current_load)) {
        current_load = 0;
    }

    courierService.create({id, max_capacity, current_load})
        .then((courier) => res.json(courier))
        .catch((e) => next(e));
}

const loadCourier: RequestHandler<void, Courier, { id: number, load: number; }> = ({body}, res, next) => {
    const {id, load} = body;
    if (isNaN(id) || isNaN(load)) {
        return next(new BadRequest('id and load params should be numbers.'));
    }

    courierService.load(id, load)
        .then(courier => res.json(courier))
        .catch(e => next(e))
};

const unloadCourier: RequestHandler<void, Courier, { id: number, load: number; }> = ({body}, res, next) => {
    const {id, load} = body;
    if (isNaN(id) || isNaN(load)) {
        return next(new BadRequest('id and load params should be numbers.'));
    }

    courierService.unload(id, load)
        .then(courier => res.json(courier))
        .catch(e => next(e))
};

const lookup: RequestHandler<void, Courier[], { capacity_required: number}> = ({body}, res, next) => {
    const {capacity_required} = body;
    if(isNaN(capacity_required)) {
        return next(new BadRequest('capacity_required param should be a number'));
    }

    courierService.lookup(capacity_required)
        .then(couriers => res.json(couriers))
        .catch(e => next(e));
}

courierRouter.get('/', listAll);
courierRouter.get('/:id', getCourierById);
courierRouter.post('/', createCourier);
courierRouter.post('/load', loadCourier);
courierRouter.post('/unload', unloadCourier);
courierRouter.post('/lookup', lookup);