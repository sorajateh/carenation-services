export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const response = await $fetch(
    `${config.public.apiBase}/bdpwr/v1/reset-password`, 
    {
      method: 'POST',
      body: {
        email: body.email
      }
    }
  )
  return response
})
