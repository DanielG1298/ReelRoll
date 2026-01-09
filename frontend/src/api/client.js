import { API } from "../const.js";

export function api(path){
    return `${API}${path}`;
}