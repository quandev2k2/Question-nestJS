import config from "../config";

export const JWT_CONSTANT = {
  SECRET: config.JWT_SECRET
}

export const JWT_TOKEN_EXPIRES = config.JWT_TOKEN_EXPIRES

export const USER_STATUS = {
  ACTIVE: 1,
  IN_ACTIVE: 2
}

export const ROLE = {
  ADMIN: 1,
  SALE: 2
}

export const ROLE_NAME = {
  ADMIN: 'ADMIN',
  SALE: 'SALE'
}

export const JOB_STATUS ={
  PENDING : 1,
  ACTIVE : 2,
}

export const JOB_STATUS_NUMBER = [
  "PENDING",
  "ACTIVE",
]

