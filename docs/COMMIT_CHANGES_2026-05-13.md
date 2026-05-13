# Изменения коммита от 2026-05-13

## Краткое описание

В этом коммите обновлены API-обертки, dashboard-страницы, авторизация и несколько мобильных/лендинговых UI-сценариев. Основной фокус: корректная обработка текущей подписки, промокодов, TOTP, ошибки неверных логина/пароля, регистрационного flow и мобильных проблем со скроллом/каруселью/карточками.

## Что изменено

### API, типы и dev mock

- Добавлен тип `CurrentSubscriptionResponse` для ответа `/subscription/current`.
- Добавлена поддержка `GET /subscription/current` в billing API.
- Экспортирован новый метод `getCurrentSubscription` из billing API.
- Добавлен `usedTrial` в тип `MeResponse`.
- Dev mock теперь возвращает тестовую текущую подписку и поле `usedTrial`.

### Dashboard и подписка

- Добавлен серверный helper `getCurrentSubscriptionOrNull`, который считает `404` от `/subscription/current` нормальным состоянием без активной подписки.
- Главная dashboard-страница теперь загружает пользователя и текущую подписку параллельно.
- Страница подписки теперь показывает карточку текущей подписки и блок промокода.
- Карточка подписки теперь показывает статус, тариф и дату окончания, а если подписки нет - понятное empty state сообщение.
- Дата окончания подписки форматируется по текущей locale.

### Промокоды

- Добавлена валидация промокода: trim, длина 1..64, разрешены `A-Z`, `a-z`, `0-9`, `.`, `_`, `+`, `-`.
- Перед отправкой промокод дополнительно trim-ится на server action.
- Поле промокода стало удобнее на мобильных: форма складывается в колонку, отключены автокапитализация, autocorrect и spellcheck.
- Добавлены локализованные сообщения ошибок для промокода.

### TOTP и профиль

- На странице профиля добавлен блок управления TOTP.
- UI профиля теперь использует `user.totp_enabled` как начальное состояние секции TOTP.

### Авторизация и регистрация

- Ошибка `ApiError` со статусом `401` и кодом/message `invalid credentials` теперь обрабатывается как ожидаемая ошибка логина, а не как server-forwarded exception.
- Добавлен alias `invalid credentials` для маппинга ошибки в `badCredentials`.
- Исправлен текст submit-кнопки регистрации: вместо `Sign In` / `Войти` теперь `Create account` / `Создать`.
- После подтверждения кода регистрации убран отдельный success animation screen; пользователь сразу переходит дальше по flow.
- В shared verify form добавлен флаг `showSuccessAnimation`, чтобы сохранить success animation там, где она еще нужна.

### Lenis и скролл

- Lenis больше не импортируется статически как runtime dependency: он загружается динамически только когда smooth scroll включен через env.
- Добавлен env gate `NEXT_PUBLIC_ENABLE_SMOOTH_SCROLL === 'true'`.
- Для iOS, iPadOS и Apple Safari используется native scroll fallback, чтобы избежать проблем с невозможностью доскроллить страницу до конца.
- Сохранен общий `scrollTo` API через context, чтобы кнопки/якоря продолжали работать и с Lenis, и с native scroll.

### Landing: testimonials

- Embla carousel теперь выравнивает слайды по центру.
- Мобильная ширина testimonial card ограничена шириной viewport с учетом side padding, чтобы первая активная карточка не была обрезана на iOS.

### Landing: benefits video card

- `VideoCard` получил `playingClassName`, который применяется только в режиме пользовательского воспроизведения.
- Видео в большой карточке `Your internet` стало чуть крупнее, а в playing mode выпрямляется без rotation и увеличивается, особенно на mobile.
- Часть декоративных элементов benefits ограничена по размеру на больших экранах, чтобы карточки были стабильнее.

### Landing: pricing

- Добавлен hardcoded switch `MATCH_ONE_MONTH_CARD_SIZE`.
- Карточка `one month` теперь может быть той же высоты, что и остальные pricing cards.
- Для отсутствующих meta-элементов (`originalPrice`, `perMonth`) добавлены invisible placeholders, чтобы layout карточек совпадал.

### Landing: connect guide

- Увеличена scroll-длина секции на mobile/tablet, чтобы шаги не переключались слишком резко.
- Прогресс скролла теперь сглаживается через spring перед расчетом активного шага.
- Индикатор активного шага получил более мягкую spring-анимацию.

### Общий UI polish

- Добавлен breakpoint `xxl`.
- Обновлены utility styles для glass/smooth/benefit cards.
- Подчищены SVG-компоненты соцсетей и упрощен path WhatsApp.
- Исправлены размеры auth background и убрана лишняя nav-ссылка из auth header.
- FAQ item переведен на более стабильные Tailwind-классы и smooth transition utility.
- В hero background снят `max-w-[2000px]`, чтобы фон лучше покрывал широкие экраны.

## Полный список файлов в коммите

- `docs/COMMIT_CHANGES_2026-05-13.md` - этот отчет по изменениям.
- `messages/en.json` - новые/исправленные тексты регистрации, подписки и промокода.
- `messages/ru.json` - новые/исправленные русские тексты регистрации, подписки и промокода.
- `src/api/billing/billing-api.ts` - метод получения текущей подписки.
- `src/api/billing/index.ts` - экспорт метода получения текущей подписки.
- `src/api/client/api-types.ts` - тип текущей подписки и `usedTrial`.
- `src/api/client/dev-mock.ts` - mock текущей подписки и `usedTrial`.
- `src/api/client/index.ts` - экспорт нового типа.
- `src/app/globals.css` - breakpoint, glass/smooth utilities и benefit card sizing.
- `src/components/assets/social-media-svgs.tsx` - форматирование SVG и оптимизация WhatsApp path.
- `src/components/providers/lenis-provider.tsx` - env gate, dynamic import и native fallback для iOS/Safari.
- `src/components/ui/video-card.tsx` - className для playing state.
- `src/hooks/use-scroll-steps.ts` - сглаживание scroll progress через spring.
- `src/lib/api-error.ts` - alias для `invalid credentials`.
- `src/ui/auth/components/auth-background.tsx` - размеры auth background/right panel.
- `src/ui/auth/components/auth-header.tsx` - удалена лишняя desktop nav-ссылка.
- `src/ui/auth/components/register-confirm-form.tsx` - отключен success animation для регистрации.
- `src/ui/auth/components/verify-code-form.tsx` - добавлен флаг `showSuccessAnimation`.
- `src/ui/auth/server/auth-actions.ts` - нормальная обработка login `401`.
- `src/ui/dashboard/components/promocode-section.tsx` - мобильная форма и input-настройки промокода.
- `src/ui/dashboard/components/subscription-card.tsx` - отображение подписки/empty state.
- `src/ui/dashboard/hooks/use-promocode.ts` - схема валидации промокода.
- `src/ui/dashboard/pages/dashboard/dashboard-page.tsx` - загрузка текущей подписки на dashboard.
- `src/ui/dashboard/pages/profile/profile-page.tsx` - TOTP section на профиле.
- `src/ui/dashboard/pages/subscription/subscription-page.tsx` - карточка подписки и промокод на странице подписки.
- `src/ui/dashboard/server/billing-actions.ts` - trim промокода перед API-вызовом.
- `src/ui/dashboard/server/subscription-data.ts` - helper для `/subscription/current` с обработкой `404`.
- `src/ui/public/landing/sections/benefits/benefits-cards.tsx` - video card playing/mobile sizing и decorative sizing.
- `src/ui/public/landing/sections/benefits/components.tsx` - media wrapper class для benefit cards.
- `src/ui/public/landing/sections/connect-guide/connect-guide.tsx` - более длинная scroll-секция.
- `src/ui/public/landing/sections/connect-guide/guide-preview.tsx` - xxl min-height для preview.
- `src/ui/public/landing/sections/connect-guide/guide-steps.tsx` - более мягкая анимация индикатора.
- `src/ui/public/landing/sections/faq/faq-item.tsx` - smooth transition и class cleanup.
- `src/ui/public/landing/sections/hero-section.tsx` - background coverage на широких экранах.
- `src/ui/public/landing/sections/pricing/pricing-card.tsx` - placeholders для отсутствующих pricing meta.
- `src/ui/public/landing/sections/pricing/pricing-section.tsx` - switch размера one-month карточки.
- `src/ui/public/landing/sections/testimonials/testimonial-card.tsx` - mobile width fix.
- `src/ui/public/landing/sections/testimonials/use-testimonials-carousel.ts` - center align carousel slides.

## Что осталось проверить или не завершено

- Нужна проверка на реальных iOS/iPadOS/macOS Safari устройствах: Lenis/native fallback, доскролл до конца страницы и центрирование первого testimonial card.
- Если клиент имел в виду все браузеры на macOS, а не только Safari, fallback Lenis нужно расширить на весь macOS. Сейчас отключается весь iOS/iPadOS и Apple Safari.
- Не запускался полный production build в рамках этого коммита. Перед релизом стоит выполнить `npm run lint`, `npx tsc --noEmit` и `npm run build`.
- Pricing card size switch сейчас намеренно hardcoded: `MATCH_ONE_MONTH_CARD_SIZE = true`. Если нужен старый compact вид, switch можно поменять в `pricing-section.tsx`.
- Backend checkout/free-trial/plan-id контракт все еще нужно подтвердить отдельно, если это требуется для production billing flow.
- `swagger-new.json`, `ui.todo` и `.todo` не являются частью product implementation в этом коммите и оставлены вне staged changes.