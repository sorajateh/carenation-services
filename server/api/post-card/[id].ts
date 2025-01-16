export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const result = await $fetch(`${config.public.apiBase}/wp/v2/invitation-card/${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${config.apiSecret}`
        },
        body: body
    })
    return result
  })