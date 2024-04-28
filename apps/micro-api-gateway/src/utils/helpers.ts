import { Metadata } from '@grpc/grpc-js';
import { JSONObject } from './types';
import { Logger } from '@nestjs/common';
import * as uuidv4 from 'uuid';
import { Request } from 'express';

export const prepGRPCPayload = (
  req: Request,
  data: JSONObject,
): { data: JSONObject; grpcMetadata: Metadata } => {
  data = convertToCamelCaseKeys(data, { deep: true });
  data = tranformBoolean(data);

  const headers: Request['headers'] = req.headers;
  const ip = headers['x-forwarded-for'] as string;

  const metadata = {
    user: headers.user ? headers.user : '{}',
    user_agent: headers['user-agent'] || 'axios/0.19.2',
    auth_token: req.signedCookies.authToken || '',
    referer: headers.referer || '',
    request_id: uuidv4(),
    ip: ip || '127.0.0.1',
  };

  const grpcMetadata = getMetadata(metadata);
  return {
    data,
    grpcMetadata,
  };
};

export const getMetadata = (headers: any): any => {
  if (typeof headers !== 'object' || headers === null) {
    throw new Error('headers must be an object');
  }
  const metadata = new Metadata();

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      metadata.add(key, headers[key]);
    }
  }
  return metadata;
};

function convertToCamelCaseKeys(obj: any, options?: { deep?: boolean }): any {
  const { deep = false } = options || {};

  function convertKeys(input: any): any {
    if (Array.isArray(input)) {
      return input.map(convertKeys);
    } else if (typeof input === 'object' && input !== null) {
      return Object.keys(input).reduce((acc, key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        const value = deep ? convertKeys(input[key]) : input[key];
        acc[camelCaseKey] = value;
        return acc;
      }, {} as any);
    } else {
      return input;
    }
  }

  return convertKeys(obj);
}

export const tranformBoolean = (object): any => {
  try {
    if (object === null) return {};
    const json = {};
    for (const key in object) {
      if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        typeof object[key] !== 'object' &&
        object[key] !== undefined
      ) {
        if (
          object[key].toString().toLowerCase() === 'true' ||
          object[key].toString().toLowerCase() === 'false'
        ) {
          json[key] = isTrueSet(object[key]);
        } else {
          json[key] = object[key];
        }
      } else if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        typeof object[key] === 'object' &&
        object[key] !== null
      ) {
        json[key] = Array.isArray(object[key])
          ? object[key]
          : tranformBoolean(object[key]);
      } else {
        json[key] = object[key];
      }
    }

    return JSON.parse(JSON.stringify(json));
  } catch (err) {
    Logger.error('Transform Error', err);
    throw new Error(err.message);
  }
};

const isTrueSet = (myValue) => myValue.toString().toLowerCase() === 'true';
