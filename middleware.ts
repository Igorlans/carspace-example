import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['ru', 'uz'],
    defaultLocale: 'ru',
    localeDetection: false
});

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|adminpanel|signIn|_next|.*\\..*).*)']
};