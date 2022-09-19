import { faker } from '@faker-js/faker';

export default function userFactory(){
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password(10)
    };

    return {...user, confirmPassword: user.password};
}