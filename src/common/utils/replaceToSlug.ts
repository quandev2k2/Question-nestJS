function slugify(text:string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9\.]/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-+|-+$/g, '');
}

export  function replaceToSlug(text:string) {
  const now = new Date();
  const sec = now.getSeconds()
  const minute = now.getMinutes()
  const hours = now.getHours()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const slug = `${slugify(text)}-${sec.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}${hours.toString().padStart(2, '0')}${date.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}`
  return slug
}