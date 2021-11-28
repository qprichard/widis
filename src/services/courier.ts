import {query} from "../utils/db";
import {Courier} from "../models/courier";
import {BadRequest, NotFound} from "http-errors";

function listAll(): Promise<Courier[]> {
    return query("SELECT * from courier ORDER BY id LIMIT 100;");
}

function getById(id: number): Promise<Courier> {
    return query("SELECT * from courier WHERE id=? LIMIT 1;", [id])
        .then((data: Courier[]) => {
            if (data?.length === 0) throw new NotFound(`Courier ${id} does not exists.`);
            return data[0];
        })
}

function create({id, current_load, max_capacity}: Courier): Promise<Courier> {
    return query("INSERT INTO courier (id, max_capacity, current_load) VALUES (?, ?, ?);", [
        id,
        max_capacity,
        current_load || 0
    ])
        .then(() => getById(id));
}

async function load(id: number, load: number): Promise<Courier> {
    const courier = await getById(id);
    load = Math.abs(load);
    const newLoad = courier.current_load + load;
    if (newLoad > courier.max_capacity) {
        throw new BadRequest(`Max capacity reached for courier ${id}`);
    }
    return query("UPDATE courier SET current_load = ? WHERE id=?;", [newLoad, id])
        .then(() => getById(id));
}

async function unload(id: number, load: number): Promise<Courier> {
    const courier = await getById(id);
    load = Math.abs(load);
    const newLoad = Math.max(courier.current_load - load, 0);
    return query("UPDATE courier SET current_load = ? WHERE id=?;", [newLoad, id])
        .then(() => getById(id));
}

function lookup(capacity_required: number): Promise<Courier[]> {
    capacity_required = Math.abs(capacity_required);
    return query("SELECT * FROM courier WHERE current_load + ? <= max_capacity;", [capacity_required]);
}

export const courierService = {
    listAll,
    getById,
    create,
    load,
    unload,
    lookup
}