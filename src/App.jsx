import { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import './App.css'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const loanData = [
  {
    id: 1,
    customerName: 'Aarav Sharma',
    loanType: 'Home Loan',
    principal: 2500000,
    interestRate: 10,
    tenure: 10,
    emi: 31731.4,
    status: 'Active',
  },
  {
    id: 2,
    customerName: 'Priya Nair',
    loanType: 'Education Loan',
    principal: 1200000,
    interestRate: 8.5,
    tenure: 6,
    emi: 20190.5,
    status: 'Active',
  },
  {
    id: 3,
    customerName: 'Rohit Mehta',
    loanType: 'Vehicle Loan',
    principal: 900000,
    interestRate: 7.25,
    tenure: 5,
    emi: 17860.3,
    status: 'Closed',
  },
  {
    id: 4,
    customerName: 'Sneha Verma',
    loanType: 'Business Loan',
    principal: 5000000,
    interestRate: 12,
    tenure: 8,
    emi: 83328.4,
    status: 'Active',
  },
  {
    id: 5,
    customerName: 'Vikram Joshi',
    loanType: 'Personal Loan',
    principal: 800000,
    interestRate: 11.5,
    tenure: 4,
    emi: 20664.9,
    status: 'Pending',
  },
  {
    id: 6,
    customerName: 'Meera Kulkarni',
    loanType: 'Home Loan',
    principal: 1800000,
    interestRate: 9.25,
    tenure: 12,
    emi: 19865.6,
    status: 'Active',
  },
]

const defaultForm = {
  loanAmount: '2500000',
  interestRate: '10',
  tenure: '10',
}

function formatCurrency(value, decimals = 0) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(value || 0))
}

function calculateEmi(principal, annualRate, years) {
  const loanAmount = Number(principal)
  const rate = Number(annualRate)
  const tenureYears = Number(years)

  if (!Number.isFinite(loanAmount) || loanAmount <= 0) {
    throw new Error('Loan amount must be greater than zero.')
  }

  if (!Number.isFinite(rate) || rate < 0) {
    throw new Error('Interest rate cannot be negative.')
  }

  if (!Number.isFinite(tenureYears) || tenureYears <= 0) {
    throw new Error('Tenure must be greater than zero.')
  }

  const months = tenureYears * 12

  if (rate === 0) {
    return {
      emi: loanAmount / months,
      totalInterest: 0,
      totalPayment: loanAmount,
    }
  }

  const monthlyRate = rate / 12 / 100
  const emi =
    (loanAmount * monthlyRate * (1 + monthlyRate) ** months) /
    ((1 + monthlyRate) ** months - 1)

  const totalPayment = emi * months
  const totalInterest = totalPayment - loanAmount

  return {
    emi,
    totalInterest,
    totalPayment,
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [calculator, setCalculator] = useState(defaultForm)
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const summary = useMemo(() => {
    const totalLoans = loanData.length
    const totalLoanAmount = loanData.reduce((sum, item) => sum + item.principal, 0)
    const averageEmi =
      loanData.reduce((sum, item) => sum + (item.emi || 0), 0) / totalLoans
    const totalInterest = loanData.reduce((sum, item) => {
      const { totalInterest } = calculateEmi(item.principal, item.interestRate, item.tenure)
      return sum + totalInterest
    }, 0)

    return {
      totalLoans,
      totalLoanAmount,
      averageEmi,
      totalInterest,
    }
  }, [])

  const chartData = useMemo(() => {
    const amountsByType = loanData.reduce((acc, item) => {
      acc[item.loanType] = (acc[item.loanType] || 0) + item.principal
      return acc
    }, {})

    return {
      labels: Object.keys(amountsByType),
      datasets: [
        {
          label: 'Loan Amount',
          data: Object.values(amountsByType),
          backgroundColor: ['#1d4ed8', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6'],
        },
      ],
    }
  }, [])

  useEffect(() => {
    window.__loanChartData = chartData
  }, [chartData])

  const filteredLoans = useMemo(() => {
    return loanData.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      const matchesSearch =
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.loanType.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [searchTerm, statusFilter])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setCalculator((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleCalculate = (event) => {
    event.preventDefault()

    const nextErrors = {}
    const amount = Number(calculator.loanAmount)
    const rate = Number(calculator.interestRate)
    const years = Number(calculator.tenure)

    if (!calculator.loanAmount.trim()) {
      nextErrors.loanAmount = 'Loan amount is required.'
    } else if (Number.isNaN(amount) || amount <= 0) {
      nextErrors.loanAmount = 'Loan amount must be a positive number.'
    }

    if (!calculator.interestRate.trim()) {
      nextErrors.interestRate = 'Interest rate is required.'
    } else if (Number.isNaN(rate) || rate < 0) {
      nextErrors.interestRate = 'Interest rate cannot be negative.'
    }

    if (!calculator.tenure.trim()) {
      nextErrors.tenure = 'Tenure is required.'
    } else if (Number.isNaN(years) || years <= 0) {
      nextErrors.tenure = 'Tenure must be greater than zero.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setResult(null)
      return
    }

    const computed = calculateEmi(amount, rate, years)
    setResult({
      emi: computed.emi,
      totalInterest: computed.totalInterest,
      totalPayment: computed.totalPayment,
    })
    setErrors({})
  }

  const handleReset = () => {
    setCalculator(defaultForm)
    setResult(null)
    setErrors({})
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand-block">
          <div className="brand-mark">L</div>
          <div>
            <p className="eyebrow">Streamhub</p>
            <h2>Loan Dashboard</h2>
          </div>
        </div>

        <nav className="nav">
          {['dashboard', 'calculator', 'reports'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
            >
              {tab === 'dashboard' ? 'Dashboard' : tab === 'calculator' ? 'EMI Calculator' : 'Reports'}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        {activeTab === 'dashboard' && (
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Overview</p>
                <h1 data-testid="dashboard-title">Loan Portfolio Dashboard</h1>
              </div>
            </div>

            <div className="summary-grid">
              <article className="stat-card" data-testid="total-loans">
                <span>Total Loans</span>
                <strong>{summary.totalLoans}</strong>
                <small>Across all borrowers</small>
              </article>
              <article className="stat-card" data-testid="total-amount">
                <span>Total Loan Amount</span>
                <strong>{formatCurrency(summary.totalLoanAmount)}</strong>
                <small>Combined principal</small>
              </article>
              <article className="stat-card" data-testid="average-emi">
                <span>Average EMI</span>
                <strong>{formatCurrency(summary.averageEmi, 2)}</strong>
                <small>Monthly obligations</small>
              </article>
              <article className="stat-card" data-testid="total-interest">
                <span>Total Interest</span>
                <strong>{formatCurrency(summary.totalInterest)}</strong>
                <small>Projected interest</small>
              </article>
            </div>

            <div className="chart-card">
              <div className="card-label-row">
                <h3>Portfolio by Loan Type</h3>
              </div>
              <div className="chart-wrap" data-testid="loan-chart">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => `₹${value / 100000}L`,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'calculator' && (
          <section className="panel calculator-layout">
            <div className="form-panel">
              <div className="panel-header compact">
                <div>
                  <p className="eyebrow">Calculator</p>
                  <h2>EMI Calculator</h2>
                </div>
              </div>

              <form onSubmit={handleCalculate} data-testid="emi-form">
                <div className="field-group">
                  <label htmlFor="loan-amount">Loan Amount</label>
                  <input
                    id="loan-amount"
                    name="loanAmount"
                    type="number"
                    min="0"
                    step="1000"
                    value={calculator.loanAmount}
                    onChange={handleFieldChange}
                    data-testid="loan-amount-input"
                    placeholder="2500000"
                    aria-invalid={Boolean(errors.loanAmount)}
                  />
                  {errors.loanAmount && <p className="error-message" role="alert">{errors.loanAmount}</p>}
                </div>

                <div className="field-group">
                  <label htmlFor="interest-rate">Interest Rate</label>
                  <input
                    id="interest-rate"
                    name="interestRate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={calculator.interestRate}
                    onChange={handleFieldChange}
                    data-testid="interest-rate-input"
                    placeholder="10"
                    aria-invalid={Boolean(errors.interestRate)}
                  />
                  {errors.interestRate && (
                    <p className="error-message" role="alert">{errors.interestRate}</p>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor="tenure">Tenure (Years)</label>
                  <input
                    id="tenure"
                    name="tenure"
                    type="number"
                    min="1"
                    step="1"
                    value={calculator.tenure}
                    onChange={handleFieldChange}
                    data-testid="tenure-input"
                    placeholder="10"
                    aria-invalid={Boolean(errors.tenure)}
                  />
                  {errors.tenure && <p className="error-message" role="alert">{errors.tenure}</p>}
                </div>

                <div className="button-row">
                  <button type="submit" className="primary-button" data-testid="calculate-btn">
                    Calculate EMI
                  </button>
                  <button type="button" className="secondary-button" onClick={handleReset} data-testid="reset-btn">
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <div className="result-panel">
              <div className="panel-header compact">
                <div>
                  <p className="eyebrow">Output</p>
                  <h2>Loan Summary</h2>
                </div>
              </div>

              {result ? (
                <>
                  <div className="result-list">
                    <div className="result-row" data-testid="emi-result">
                      <span>Monthly EMI</span>
                      <strong>{formatCurrency(result.emi, 2)}</strong>
                    </div>
                    <div className="result-row" data-testid="total-interest">
                      <span>Total Interest</span>
                      <strong>{formatCurrency(result.totalInterest)}</strong>
                    </div>
                    <div className="result-row" data-testid="total-payment">
                      <span>Total Payment</span>
                      <strong>{formatCurrency(result.totalPayment)}</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-result">
                  <p>Enter loan values and calculate to view your EMI breakdown.</p>
                </div>
              )}

              <div className="chart-card mini-chart" data-testid="loan-chart">
                <div className="card-label-row">
                  <h3>Portfolio Snapshot</h3>
                </div>
                <div className="chart-wrap small-chart">
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: {
                          ticks: {
                            callback: (value) => `₹${value / 100000}L`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'reports' && (
          <section className="panel reports-panel">
            <div className="panel-header compact">
              <div>
                <p className="eyebrow">Reports</p>
                <h2>Loan Portfolio Report</h2>
              </div>
            </div>

            <div className="report-controls">
              <div className="field-group inline-field">
                <label htmlFor="report-search">Search customer or type</label>
                <input
                  id="report-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by name or loan type"
                  data-testid="report-search"
                />
              </div>

              <div className="field-group inline-field">
                <label htmlFor="status-filter">Status</label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  data-testid="status-filter"
                >
                  <option value="all">All</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="table-wrap">
              <table data-testid="report-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Principal</th>
                    <th>Rate</th>
                    <th>Tenure</th>
                    <th>EMI</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.customerName}</td>
                      <td>{loan.loanType}</td>
                      <td>{formatCurrency(loan.principal)}</td>
                      <td>{loan.interestRate}%</td>
                      <td>{loan.tenure} yrs</td>
                      <td>{formatCurrency(loan.emi)}</td>
                      <td>{loan.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
