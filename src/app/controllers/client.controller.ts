import { Context } from 'koa';
import * as clientService from '../services/client.service';
import config from '../../config/config';

/**
 *
 * @param ctx Koa Context with all meta data
 * @description To login a user and provided the access and refresh token
 */
export async function login(ctx: Context) {
  const response = await clientService.login(ctx);

  if (response?.status === 'success') {
    ctx.cookies.set('access_token', response.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: config.is_server,
      path: '/',
    });
    ctx.cookies.set('refresh_token', response.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: config.is_server,
      path: '/',
    });
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      message: response.message,
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      status: 'failed',
      message: response.message,
    };
  }
}

/**
 *
 * @param ctx Koa Context with all meta data
 * @description To signup a user and provided the access and refresh token
 */
export async function signup(ctx: Context) {
  const response = await clientService.signup(ctx);

  if (response?.status === 'success') {
    ctx.cookies.set('access_token', response.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: config.is_server,
      path: '/',
    });
    ctx.cookies.set('refresh_token', response.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: config.is_server,
      path: '/',
    });
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      message: 'Signup successful',
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      status: 'failed',
      message: 'Signup failed',
    };
  }
}
