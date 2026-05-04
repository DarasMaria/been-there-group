// The home page lives in app/(site)/page.tsx where it picks up the site layout.
// This file re-exports it so the root route is handled without conflict.
export { default } from './(site)/page'
