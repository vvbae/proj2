import { useSession } from '@/hooks'
import { useForm } from 'react-hook-form'
// import './styles.css'

export default function Register() {
  const userSession = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userName: '',
      userAddr: ''
    }
  })

  const onSubmit = (data: any) => {
    const newUser = {
      name: data.userName,
      billing_addr: data.userAddr
    }

    fetch('http://localhost:8000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then((response) => response.json())
      .then((data) => userSession.setCid(data.ret[0]))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <h1>userId: {userSession.cid}</h1> */}
      <label>Name</label>
      <input {...register('userName', { required: true, maxLength: 50 })} />
      <label>Billing Address</label>
      <input {...register('userAddr', { required: true, maxLength: 50 })} />
      {errors.userAddr && <p>This field is required</p>}
      <input type="submit" />
    </form>
  )
}
