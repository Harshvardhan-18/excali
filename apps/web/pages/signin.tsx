import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { BACKEND_URL } from '../app/config'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('email')
    const password = formData.get('password')

    try {
      await axios.post(
        `${BACKEND_URL}/signin`,
        { username, password},
        { withCredentials: true }  
      )
      
      router.push("/");
      
      
    } catch (err) {
      console.error('Signup failed:', err)
      alert('Invalid email or password!')
    }
 
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}