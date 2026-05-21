# Translation Structure

Messages are split by locale and top-level product area:

```text
messages/
  en/
    auth.json
    common.json
    dashboard.json
    dev.json
    landing.json
    legal.json
    meta.json
    nav.json
  ru/
    ...same namespaces
```

`src/i18n/messages.ts` assembles these files into the same runtime shape used by
`next-intl`, so existing namespaces such as `auth.login`, `landing.pricing`, and
`dashboard.profile` remain stable.

When adding or renaming a key, update the matching file in both locales in the
same change.