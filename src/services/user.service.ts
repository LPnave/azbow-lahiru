import bcrypt from "bcrypt";
import { DeepPartial } from "typeorm";
import { User } from "../model/index";
import { UserRepository } from "../repositories/index";
import { UserDto, UserInitialDto } from "../dto/user.dto";

export class UserService {
    constructor(public userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async add(data: UserInitialDto): Promise<User> {
        const dbUser = new User();
        dbUser.email = data.email;
        dbUser.password = await bcrypt.hash(data.password, 10);
        dbUser.phone = data.phone;
        dbUser.role = data.role;
        dbUser.name = data.name;
        return await this.userRepository.save(dbUser);
    }

    async edit(data: UserDto): Promise<void> {
        if (data.password !== undefined) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return await this.userRepository.edit(data.userId, data);
    }

    async getById(id: string): Promise<User | null> {
        return await this.userRepository.get(id);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.userRepository.getByEmail(email);
    }

    async checkCredentials(email: string, password: string): Promise<boolean> {
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            return false;
        }
        return bcrypt.compare(password, user.password);
    }
}

export const createUserService = (
    userRepository: UserRepository
): UserService => new UserService(userRepository);
