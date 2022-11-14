import config from "config";
import { omit } from "lodash";
import { FilterQuery, QueryOptions } from "mongoose";
import { excludeFields } from "../controllers/auth.controller";
import userModel, { User } from "../models/user.model";
import redisClient from "../utils/connectRedis";
import { signJwt } from "../utils/jwt";

import { DocumentType } from '@typegoose/typegoose';

export const createUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return omit(user.toJSON(), excludeFields);
};

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return await userModel.findOne(query, {}, options).select('+password');
}

export const findUserById = async (id:string) => {
    const user = await userModel.findById(id).lean();
    return omit(user, excludeFields);
}

export const findAllUsers = async () => {
    return await userModel.find();
}

export const signInToken = async (user: DocumentType<User>) => {
    const access_token = signJwt(
        { sub: user._id },
        {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
        }
    );

    // create session in redis
    redisClient.set(user._id, JSON.stringify(user), {
        EX: 60 * 60,
    });

    return { access_token };
};