export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/') {
        return navigateTo('/invitation-card', { redirectCode: 301 })
    }
})
