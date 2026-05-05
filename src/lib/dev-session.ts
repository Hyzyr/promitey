/** Sentinel token returned by getAccessToken() when dev test session is active. */
export const DEV_TOKEN_SENTINEL = '__DEV_TEST_TOKEN__';

/** Cookie name that activates the dev test session. */
export const DEV_TEST_COOKIE = 'dev_test_user';

/** True only in development. Tree-shaken out of production builds. */
export const IS_DEV = process.env.NODE_ENV === 'development';
