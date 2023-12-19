import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'daily energy consumption during 2023-12'
    }
  }
}

export default function Chart(props: { data: any; text: string }) {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const
          },
          title: {
            display: true,
            text: props.text
          }
        }
      }}
      data={props.data}
    />
  )
}
