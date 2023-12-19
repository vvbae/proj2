import { useSession } from '@/hooks'
import { Chart } from '../../components'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function Metrics() {
  const today = new Date().toJSON().slice(0, 10)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      date: today,
      month: '12',
      year: '2023'
    }
  })

  function isDateFormat(input: string): boolean {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/
    const isValidDateFormat = dateFormatRegex.test(input)
    return isValidDateFormat
  }

  function isAllDigits(input: string): boolean {
    const digitsOnlyRegex = /^\d+$/
    const isAllDigits = digitsOnlyRegex.test(input)
    return isAllDigits
  }

  const user = useSession()
  const [date, setDate] = useState({
    day: new Date().getDate(),
    month: 12,
    year: 2023
  })
  const [view1, setView1] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: ''
      }
    ]
  })
  const [view2, setView2] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: ''
      }
    ]
  })
  const [view3, setView3] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: ''
      },
      {
        label: '',
        data: [],
        backgroundColor: ''
      }
    ]
  })
  const [view4, setView4] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: ''
      }
    ]
  })
  const fetchView1 = (data: any) => {
    if (!isAllDigits(data.month) || !isAllDigits(data.year)) {
      alert(
        'The input contains non-digit characters. Please enter a string consisting of only digits.'
      )
      return
    }

    fetch(
      `http://localhost:8000/views/1?user_id=${user.cid}&month=${data.month}&year=${data.year}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => response.json())
      .then((items) => {
        setView1({
          labels: items.ret.map((record: any[]) => record[1]),
          datasets: [
            {
              label: '1',
              data: items.ret.map((record: any[]) => record[2]),
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        })
      })
  }
  const fetchView2 = (data: any) => {
    if (!isDateFormat(data.date)) {
      alert(
        "Invalid date format. Please enter a date in the format 'yyyy-mm-dd'."
      )
      return
    }

    fetch(
      `http://localhost:8000/views/2?user_id=${user.cid}&day=${data.date}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => response.json())
      .then((items) => {
        setView2({
          labels: items.ret.map((record: any[]) => record[0]),
          datasets: [
            {
              label: '2',
              data: items.ret.map((record: any[]) => record[2]),
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        })
      })
  }
  const fetchView3 = (data: any) => {
    if (!isAllDigits(data.month) || !isAllDigits(data.year)) {
      alert(
        'The input contains non-digit characters. Please enter a string consisting of only digits.'
      )
      return
    }

    fetch(
      `http://localhost:8000/views/3?user_id=${user.cid}&month=${data.month}&year=${data.year}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => response.json())
      .then((items) => {
        setView3({
          labels: items.ret.map((record: any[]) => record[0]),
          datasets: [
            {
              label: 'mine',
              data: items.ret.map((record: any[]) => record[2]),
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
              label: 'avg',
              data: items.ret.map((record: any[]) => record[3]),
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
          ]
        })
      })
  }
  const fetchView4 = (data: any) => {
    if (!isDateFormat(data.date)) {
      alert(
        "Invalid date format. Please enter a date in the format 'yyyy-mm-dd'."
      )
      return
    }
    fetch(
      `http://localhost:8000/views/4?user_id=${user.cid}&day=${data.date}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then((response) => response.json())
      .then((items) => {
        setView4({
          labels: items.ret.map((record: any[]) => record[0]),
          datasets: [
            {
              label: 'peak price',
              data: items.ret.map((record: any[]) => record[1]),
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
            {
              label: 'off-peak price',
              data: items.ret.map((record: any[]) => record[4]),
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
          ]
        })
      })
  }
  useEffect(() => {
    fetchView1({ month: '12', year: '2023' })
    fetchView2({ date: today })
    fetchView3({ month: '12', year: '2023' })
    fetchView4({ date: today })
  }, [])

  return (
    <div>
      <div>
        <h1>View 1</h1>
        <form onSubmit={handleSubmit(fetchView1)}>
          <label>month</label>
          <input {...register('month')} defaultValue="12" />
          <label>year</label>
          <input {...register('year')} defaultValue="2023" />
          <input type="submit" />
        </form>
        <Chart
          data={view1}
          text={`daily energy consumption during ${date.year}-${date.month}`}
        />
      </div>
      <div>
        <h1>View 2</h1>
        <form onSubmit={handleSubmit(fetchView2)}>
          <label>date</label>
          <input {...register('date')} defaultValue={today} />
          <input type="submit" />
        </form>
        <Chart
          data={view2}
          text={`energy consumption per device for ${date.year}-${date.month}-${date.day}`}
        />
      </div>
      <div>
        <h1>View 3</h1>
        <form onSubmit={handleSubmit(fetchView3)}>
          <label>month</label>
          <input {...register('month')} defaultValue="12" />
          <label>year</label>
          <input {...register('year')} defaultValue="2023" />
          <input type="submit" />
        </form>
        <Chart
          data={view3}
          text={`energy consumption during ${date.year}-${date.month} compares to the similar average`}
        />
      </div>
      <div>
        <h1>View 4</h1>
        <form onSubmit={handleSubmit(fetchView4)}>
          <label>date</label>
          <input {...register('date')} defaultValue={today} />
          <input type="submit" />
        </form>
        <Chart
          data={view4}
          text={`device usage peak vs non-peak during ${today}`}
        />
      </div>
    </div>
  )
}

export default Metrics
