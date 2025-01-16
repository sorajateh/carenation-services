export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const response = await $fetch(
    `${config.public.apiBase}/jwt-auth/v1/token`, 
    { 
      method: 'POST', 
      body: { 
        username: body.username, 
        password: body.password
      }, 
      ignoreResponseError: true 
    }
  )
  return response
})
