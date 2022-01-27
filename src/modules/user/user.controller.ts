import {Controller, Get, Post, Patch, Delete, Query, Body, Req} from '@nestjs/common';
import {UserService} from './user.service';
import {Crud, CrudController, ParsedBody} from '@nestjsx/crud';
import { User } from '../../entity';
import {log} from 'util';

export class CreateUser {
    phoneNumber: string;
}

@Crud({ model: {type: User }})
@Controller('api/users')
export class UserController {
    constructor(public readonly service: UserService) {}

    @Get()
    async findUser(@Query('id') id, @Query('phoneNumber') phoneNumber): Promise<any> {
        if(id === undefined) {
            const users = await this.service.getAllUser();
            return {
                status: 1,
                user: users,
            };
        }
        const user = await this.service.getUser(id, phoneNumber);
        if(user) {
            return {
                status: 1,
                user: user,
            };
        }
        return {
            status: 0,
            msg: 'Not exist User',
        };
    }

    @Post()
    async createUser(@Body() body: CreateUser): Promise<any> {
        const phoneNumber = body.phoneNumber;
        if(phoneNumber === undefined) {
            return {
                status: 0,
                msg: 'Input phone number',
            };
        }
        const result = await this.service.createUser(phoneNumber);
        return {
            status: 1,
            userId: result,
        };
    }

    @Patch()
    async updateUser(@Query('id') id, @Query('phoneNumber') phoneNumber): Promise<any>  {
        if(id === undefined) {
            return {
                status: 0,
                msg: 'Input User Id',
            };
        }
        if(phoneNumber === undefined) {
            return {
                status: 0,
                msg: 'Input phone number',
            };
        }
        const result = await this.service.updateUser(id, phoneNumber);
        if(result) {
            return {
                status: 1,
                msg: 'successfully updated',
            };
        }
        return {
            status: 0,
            msg: 'Not exist User',
        };
    }

    @Delete()
    async deleteUser(@Query('id') id, @Query('phoneNumber') phoneNumber): Promise<any>  {
        if(id === undefined) {
            return {
                status: 0,
                msg: 'Input User Id',
            };
        }
        if(phoneNumber === undefined) {
            return {
                status: 0,
                msg: 'Input phone number',
            };
        }
        const result = await this.service.deleteUser(id, phoneNumber);
        if(result) {
            return {
                status: 1,
                msg: 'successfully deleted',
            };
        }
        return {
            status: 0,
            msg: 'Not exist User',
        };
    }
}
