import { describe,expect,it } from "vitest";
import { hashPassword, verifyPassword } from "./hashed";

describe("hashPassword",()=>{
  it("never store the plain password", ()=>{
    const password = "12345678";
    const stored = hashPassword(password);
    expect(stored).not.toContain(password)
  })

  it("salt changes per hash",()=>{
    const password = "12345678";
    const hashed1 = hashPassword(password);
    const hashed2 = hashPassword(password);
    const [salt1 , p1] = hashed1.split(':')
    const [salt2 , p2] = hashed2.split(':')
    expect(salt1).not.toBe(salt2)
  })
})

describe("verifyPassword",()=>{
  it("verify round-trips(correct password)",()=>{
    expect(verifyPassword("12345678",hashPassword("12345678"))).toBe(true)
  })
  
  it("reject a wrong password",()=>{
    const stored = hashPassword("12345678")
    expect(verifyPassword("00000000", stored)).toBe(false)
  })

  it("reject a tampered hash(same length)", ()=>{
    const stored = hashPassword("12345678");
    const tampered = stored.replace(/.$/, c => (c === "0" ? "1":"0"));
    expect(verifyPassword("12345678",tampered)).toBe(false)
  })

  it("reject a truncated hash (length guard)", ()=>{
    const stored = hashPassword("12345678");
    const truncated = stored.slice(0, stored.length - 10)
    expect(verifyPassword("12345678", truncated)).toBe(false)
  })
})