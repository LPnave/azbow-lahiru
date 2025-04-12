import { DeepPartial, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import {getDbConnection}  from "../database";

abstract class BaseRepository<T extends ObjectLiteral> {
    private modelClass: EntityTarget<T>;

    constructor(modelClass: EntityTarget<T>) {
        this.modelClass = modelClass;
    }

    private async getRepository(): Promise<Repository<T>> {
        const db = await getDbConnection();
        return db.getRepository(this.modelClass);
    }

    async getQueryBuilder(alias: string) {
        const repo = await this.getRepository();
        return repo.createQueryBuilder(alias);
    }

    async getAll(): Promise<T[]> {
        const repo = await this.getRepository();
        return repo.find();
    }

    async get(id: string): Promise<T | null> {
        const repo = await this.getRepository();
        return await repo.findOne({ where: { id } as any }) || null;
    }

    async edit(id: string, data: DeepPartial<T>): Promise<void> {
        const repo = await this.getRepository();
        const existing = await this.get(id);
        if (existing) {
            const updated = repo.merge(existing, data);
            await repo.save(updated);
        }
    }

    async save(object: DeepPartial<T>): Promise<T> {
        const repo = await this.getRepository();
        return await repo.save(object);
    }

    async remove(object: T): Promise<void> {
        const repo = await this.getRepository();
        await repo.remove(object);
    }
}

export default BaseRepository;
