export function loadSentry(dsn: string, release: string) {
  import('@sentry/browser')
    .then((sentry) => {
      console.warn('load sentry successful');
      sentry.init({
        dsn,
        release
      });
    })
    .catch((err) => {
      console.warn('load sentry failed', err);
    });
}
