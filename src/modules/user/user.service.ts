import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../entity';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) repo) {
        super (repo);
    }

    async getAllUser(): Promise<User[]> {
        return await this.repo.find();
    }

    async getUser(id: number, phoneNumber: string): Promise<User> {
        return await this.repo.findOne({id: id, phoneNumber: phoneNumber});
    }

    async updateUser(id: number, phoneNumber: string): Promise<boolean> {
        const user = await this.repo.findOne({id: id});
        if(user) {
            user.phoneNumber = phoneNumber;
            await this.repo.save(user);
            return true;
        }
        return false;
    }

    async createUser(phoneNumber: string): Promise<number> {
        const user = new User();
        user.phoneNumber = phoneNumber;
        await this.repo.save(user);
        return user.id;
    }

    async deleteUser(id: number, phoneNumber: string): Promise<boolean> {
        const user = await this.getUser(id, phoneNumber);
        if(user) {
            await this.repo.delete(user);
            return true;
        }
        return false;
    }
}
