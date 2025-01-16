export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const body = await readBody(event)
    const response = await $fetch(`${config.public.apiBase}/invitation-card/v1/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${config.apiSecret}`
        },
        body: {
            base64_image: body.base64_image,
            filename: body.filename
        }
    })
    return response
})