/** Sentinel token returned by getAccessToken() when dev mock mode is explicitly enabled. */
export const DEV_TOKEN_SENTINEL = '__DEV_TEST_TOKEN__';

/** Cookie name that activates the optional dev mock session. */
export const DEV_TEST_COOKIE = 'dev_test_user';

/** True only in development. Tree-shaken out of production builds. */
export const IS_DEV = process.env.NODE_ENV === 'development';

/** Optional fixture mode. Off by default so development uses the real API. */
export const IS_DEV_MOCK_API_ENABLED =
	IS_DEV && process.env.ENABLE_DEV_MOCK_API === 'true';
