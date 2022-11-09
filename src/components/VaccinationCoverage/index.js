// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {cover} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart width={1000} height={400} data={cover} margin={{top: 10}}>
      <XAxis
        dataKey="vaccine_date"
        tick={{stroke: '#cbd5e1', strokeWidth: 2}}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{stroke: '#cbd5e1', strokeWidth: 2}}
      />
      <Legend wrapperStyle={{padding: 20}} />
      <Bar
        dataKey="doseOne"
        name="Dose 1"
        fill="#2d87bb"
        barSize="8%"
        radius={[8, 8, 0, 0]}
      />
      <Bar
        dataKey="doseTwo"
        name="Dose 2"
        fill="#f54394"
        barSize="8%"
        barBorder="5px"
        radius={[8, 8, 0, 0]}
      />
    </BarChart>
  )
}

export default VaccinationCoverage
