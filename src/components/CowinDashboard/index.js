// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiConstrants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    covidData: {},
    apiStatus: apiConstrants.initial,
  }

  componentDidMount() {
    this.getCovidData()
  }

  getCovidData = async () => {
    this.setState({apiStatus: apiConstrants.inprogress})

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        lastSevenDays: data.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          doseOne: each.dose_1,
          doseTwo: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGenderDetails: data.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }

      this.setState({
        covidData: updatedData,
        apiStatus: apiConstrants.success,
      })
    } else {
      this.setState({apiStatus: apiConstrants.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        className="failure"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="fail-head">Something went wrong</h1>
    </div>
  )

  successView = () => {
    const {covidData} = this.state
    return (
      <div>
        <div className="barchart-container">
          <h1 className="bar-heading">Vaccination Coverage</h1>
          <VaccinationCoverage cover={covidData.lastSevenDays} />
        </div>
        <div className="barchart-container">
          <h1 className="bar-heading">Vaccination by gender</h1>
          <VaccinationByGender gender={covidData.vaccinationByGenderDetails} />
        </div>
        <div className="barchart-container">
          <h1 className="bar-heading">Vaccination by Age</h1>
          <VaccinationByAge age={covidData.vaccinationByAge} />
        </div>
      </div>
    )
  }

  renderBasedOnStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstrants.success:
        return this.successView()
      case apiConstrants.failure:
        return this.failureView()
      case apiConstrants.inprogress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="content-container">
          <div className="logo-container">
            <img
              className="logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            />
            <p className="logo-name">Co-WIN</p>
          </div>
          <h1 className="head">CoWIN Vaccination in India</h1>
          {this.renderBasedOnStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
