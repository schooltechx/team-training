import { env } from '$env/dynamic/public'
export async function load() {
  //console.log("PUBLIC_BASE_PATH="+env.PUBLIC_BASE_PATH)
  return {"BASE_PATH":env.PUBLIC_BASE_PATH}
}