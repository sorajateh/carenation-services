export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const session = await getUserSession(event)
    const body = await readBody(event)
    const response = await $fetch(`${config.public.apiBase}/wp/v2/invitation-card/`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${config.apiSecret}`
        },
        body: body
    })
    return response
})