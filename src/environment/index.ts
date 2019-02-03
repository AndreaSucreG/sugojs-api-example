import * as env from './localhost'
import * as devEnv from './development'
import * as testEnv from './testing'
import * as prodEnv from './production'
import { ConnectionOptions } from 'mongoose';



export interface MongooseOptions {
  uri: string;
  options: ConnectionOptions
}

export interface Environment {
  mongoose: MongooseOptions
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export const isObject = (item:any) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export const mergeDeep = (target: any, ...sources: any[]): any  => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

let finalEnv:Environment = Object.assign(env)
if (process.env.NODE_ENV === "development") {
  finalEnv = mergeDeep(env, devEnv);
} else if (process.env.NODE_ENV === "testing") {
  finalEnv = mergeDeep(env, testEnv);
} else if (process.env.NODE_ENV === "production") {
  finalEnv = mergeDeep(env, prodEnv);
}


export default finalEnv;
