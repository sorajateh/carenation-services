export default defineNuxtRouteMiddleware((to, from) => {
    
    const { loggedIn } = useUserSession()

    if (to.path === '/invitation-card' && !to.query.compose && loggedIn.value) {
        return navigateTo('/invitation-card/saved-cards')
    }
    
    if ( (to.path === '/invitation-card/saved-cards' || to.name === 'edit-id' || to.name === 'preview-id') && !loggedIn.value) {
        return navigateTo('/invitation-card')
    }

})