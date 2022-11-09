// Write your code here

import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {gender} = props

  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="40%"
        data={gender}
        startAngle={180}
        endAngle={0}
        innerRadius="30%"
        outerRadius="60%"
        dataKey="count"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill="#5a8dee" />
        <Cell name="others" fill="#2cc6c6" />
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

export default VaccinationByGender
