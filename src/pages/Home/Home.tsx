import { useSession } from '@/hooks'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DropdownList from 'react-widgets/DropdownList'

function Home() {
  const types = ['Fridge', 'Washer', 'Dryer', 'Oven']
  const models = [
    'Samsung RS300',
    'Whirlpool XZ',
    'LG V7',
    'Maytag YZ',
    'GE Oven Pro'
  ]
  const [lid, setLid] = useState(0)
  const [lids, setLids] = useState([])

  const user = useSession()

  useEffect(() => {
    fetch(`http://localhost:8000/locations?user_id=${user.cid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => data['Locations'].map((row: any[]) => row[0]))
      .then(setLids)
  }, [])

  const [device, setDevice] = useState({
    type: '',
    model: ''
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      address: '',
      unit_no: '',
      zip_code: '',
      start_date: '',
      size_sqft: '',
      num_beds: '',
      num_occupants: ''
    }
  })

  const onSubmitLocation = (data: any) => {
    const newLocation = {
      cid: user.cid,
      address: data.address,
      unit_no: data.unit_no,
      zip_code: data.zip_code,
      start_date: data.start_date,
      size_sqft: data.size_sqft,
      num_beds: data.num_beds,
      num_occupants: data.num_occupants
    }

    fetch('http://localhost:8000/locations/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLocation)
    })
      .then((response) => response.json())
      .then(console.log)
  }

  const onSubmitDevice = () => {
    const newDevice = {
      lid,
      time_added: '2023-12-15',
      type: device.type,
      model: device.model
    }

    fetch('http://localhost:8000/devices/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDevice)
    }).then(console.log)
  }

  return (
    <>
      <h1>Add Device</h1>
      <form onSubmit={onSubmitDevice}>
        <h2>Choose Location</h2>
        <DropdownList
          value={lid}
          onChange={(nextValue) => setLid(parseInt(nextValue))}
          data={lids.map((item) => item) || []}
        />
        <h2>Choose Type</h2>
        <DropdownList
          value={device.type}
          onChange={(nextValue) => setDevice({ ...device, type: nextValue })}
          data={types.map((item) => item)}
        />
        <h2>Choose Model</h2>
        <DropdownList
          value={device.model}
          onChange={(nextValue) => setDevice({ ...device, model: nextValue })}
          data={models.map((item) => item)}
        />
        <input type="submit" />
      </form>

      <h1>Add Location</h1>
      <form onSubmit={handleSubmit(onSubmitLocation)}>
        <label>address</label>
        <input {...register('address', { required: true, maxLength: 50 })} />
        <label>unit_no</label>
        <input {...register('unit_no', { required: true, maxLength: 50 })} />
        <label>zip_code</label>
        <input {...register('zip_code', { required: true, maxLength: 50 })} />
        <label>start_date</label>
        <input {...register('start_date', { required: true, maxLength: 50 })} />
        <label>size_sqft</label>
        <input {...register('size_sqft', { required: true, maxLength: 50 })} />
        <label>num_beds</label>
        <input {...register('num_beds', { required: true, maxLength: 50 })} />
        <label>num_occupants</label>
        <input
          {...register('num_occupants', { required: true, maxLength: 50 })}
        />
        <input type="submit" />
      </form>
    </>
  )
}

export default Home
