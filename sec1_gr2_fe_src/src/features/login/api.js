const API_URL = "http://localhost:3005";


export async function api(path,options = {}){
  const response = await fetch(`${API_URL}${path}`,{
    ...options,
    credentials: "include",
    headers:{
      "Content-Type":"application/json",
      ...options.headers,
    }
  })

  const data = await response.json()

  if(!response.ok){
    throw new Error(data.error || "Request failed")
  }

  return data
}

export function register(Username,Password){
  return api("/api/register",{
    method:"POST",
    body: JSON.stringify({Username,Password})
  })
}

export function getMe(){
  return api("/api/me")
}

export function login(Username,Password){
  return api("/api/login",{
    method: "POST",
    body: JSON.stringify({Username,Password})
  })
}

export function logout(){
  return api("/api/logout",{
    method: "POST"
  })
}