export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  return url
})
