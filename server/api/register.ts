export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const response = await $fetch(
    `${config.public.apiBase}/wp/v2/users`, {
      method: 'POST',
      headers: {
          Authorization: `Basic ${config.apiSecret}`
      },
      body: body
    }
  )
  return { response }
})
