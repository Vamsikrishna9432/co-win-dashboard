// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {age} = props

  return (
    <PieChart width={1000} height={300}>
      <Pie cx="50%" cy="40%" data={age} outerRadius="60%" dataKey="count">
        <Cell name="18-44" fill="#2d87bb" />
        <Cell name="44-60" fill="#a3df9f" />
        <Cell name="Above 60" fill="#64C2A6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByAge
