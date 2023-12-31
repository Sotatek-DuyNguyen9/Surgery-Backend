import joi from "joi";

export const email= joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required();

export const password = joi.string().min(6).required();

