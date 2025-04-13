import { PropertyDTO } from "../dto/property.dto";
import { Property} from "../model/property";
import { PropertyRepository } from "../repositories/property.repository";

export class PropertyService {
    constructor(public propertyRepository: PropertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    async createProperty(data: PropertyDTO): Promise<Property> {
        const property = new Property();

        property.title = data.title;
        property.location = data.location;
        property.price = data.price;
        property.type = data.type;
        property.status = data.status;
        property.createdAt = new Date();
        property.updatedAt = new Date();

        return await this.propertyRepository.save(data);
    }

    async updateProperty(data: PropertyDTO): Promise<void | null> {
        let property = await this.propertyRepository.get(data.propertyID as any); // UUIDs are strings
        
        if (!property){
            return null;
        }else{
            property = { ...property, ...data } as Property;
            property.updatedAt = new Date(); // Update the updatedAt field
            await this.propertyRepository.edit(property.propertyID, property);;
        }
    }

    async getById(id: string): Promise<Property | null> {
        return await this.propertyRepository.get(id);
    }

    async getAll(): Promise<Property[]> {
        return await this.propertyRepository.getAll();
    }
}


export const createPropertyService = (
    propertyRepository: PropertyRepository
): PropertyService => new PropertyService(propertyRepository);