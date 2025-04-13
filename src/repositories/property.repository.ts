import BaseRepository from "./base.repository";
import { Property } from "../model/property";

export class PropertyRepository extends BaseRepository<Property> {
    constructor() {
        super(Property); // Pass the Property entity to BaseRepository
    }
}

export const propertyRepository = new PropertyRepository();
