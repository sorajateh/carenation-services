export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const response = await $fetch(
    `${config.public.apiBase}/bdpwr/v1/set-password`, 
    {
      method: 'POST',
      body: {
        email: body.email,
        password: body.password,
        code: body.code
      }
    }
  )
  return response
})
