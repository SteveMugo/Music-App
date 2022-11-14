import { type } from "os";
import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({required_error: 'Name is required' }),
        email: string({ required_error: 'Email is required'}).email(
            'invalid email from user'
        ),
        password: string({ required_error: 'password is required' })
        .min(8, 'Password must be more than eight 8 characters')
        .max(32, 'Password must be less than Thirty Two 32 characters'),
        
        passwordConfirm: string({ required_error: 'Kindly confirm your password' }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'passwords dont match',
    }),
});

export const loginUserSchema = object({
    body: object({
        email: string({ required_error: 'Email is a requirement' }).email(
            'Invalid Email and or Password'
        ),
        password: string({ required_error: 'Password is required' }).min(
            8,
            'Invalid email and or password'),
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];