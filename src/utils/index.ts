export * from './http';
export * from './day';
export * from './storage';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isProduction() {
  return !isDev();
}
