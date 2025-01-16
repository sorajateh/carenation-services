export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const id = getRouterParam(event, 'id')
    const result = await $fetch(`${config.public.apiBase}/wp/v2/invitation-card/${id}`, {
        method: 'GET'
    })
    return result
  })