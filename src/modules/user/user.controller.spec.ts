import { Test, TestingModule } from '@nestjs/testing';
import {UserService} from './user.service';
import {CreateUser, UserController} from './user.controller';

describe("UserController Unit Tests", () => {
    let userController: UserController;
    let spyService: UserService;
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: UserService,
            useFactory: () => ({
                getAllUser: jest.fn(() => []),
                getUser: jest.fn(() => { }),
                createUser: jest.fn(() => []),
                updateUser: jest.fn(() => { }),
                deleteUser: jest.fn(() => { })
            })
        }
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, ApiServiceProvider],
        }).compile();

        userController = app.get<UserController>(UserController);
        spyService = app.get<UserService>(UserService);
    })

    it('calling getAllUser method', async () => {
        await userController.findUser(undefined, undefined);
        const spy = jest.spyOn(spyService, 'getAllUser');
        expect(spy).toHaveBeenCalled();
    });

    it('calling getFindUser method', async () => {
        const id = 11;
        const phoneNumber = 22;
        await userController.findUser(id, phoneNumber);
        const spy = jest.spyOn(spyService, 'getUser');
        expect(spy).toBeCalledWith(id, phoneNumber);
    });

    it('calling createUser method with invalid param', async () => {
        const user = new CreateUser();
        const result = await userController.createUser(user);
        expect(result.status).toEqual(0);
    });

    it('calling createUser method with valid param', async () => {
        const user = new CreateUser();
        user.phoneNumber = '123';
        const result = await userController.createUser(user);
        const spy = jest.spyOn(spyService, 'createUser');
        expect(spy).toBeCalledWith(user.phoneNumber);
    });

    it('calling updateUser method with invalid param', async () => {
        const result = await userController.updateUser(11, undefined);
        expect(result.status).toEqual(0);
    });

    it('calling updateUser method with valid param', async () => {
        const id = 11;
        const phoneNumber = '123';
        const result = await userController.updateUser(id, phoneNumber);
        const spy = jest.spyOn(spyService, 'updateUser');
        expect(spy).toBeCalledWith(id, phoneNumber);
    });

    it('calling deleteUser method with invalid param', async () => {
        const result = await userController.deleteUser(11, undefined);
        expect(result.status).toEqual(0);
    });

    it('calling deleteUser method with valid param', async () => {
        const id = 11;
        const phoneNumber = '123';
        const result = await userController.deleteUser(id, phoneNumber);
        const spy = jest.spyOn(spyService, 'deleteUser');
        expect(spy).toBeCalledWith(id, phoneNumber);
    });

});
