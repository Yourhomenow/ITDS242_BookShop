import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto" 

export function hashPassword(plain){
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(plain, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(plain,store){
  const [salt, hash] = store.split(':')

  if(!salt || !hash) return false;

  const candidate = scryptSync(plain,salt,64).toString("hex")
  if(candidate.length !== hash.length) return false;
  return timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash,"hex"))
}