export function calculateEmi(principal: number, annualRate: number, years: number) {
  if (!Number.isFinite(principal) || principal <= 0) {
    throw new Error('Loan amount must be greater than zero.')
  }

  if (!Number.isFinite(annualRate) || annualRate < 0) {
    throw new Error('Interest rate cannot be negative.')
  }

  if (!Number.isFinite(years) || years <= 0) {
    throw new Error('Tenure must be greater than zero.')
  }

  const months = years * 12

  if (annualRate === 0) {
    return {
      emi: principal / months,
      totalInterest: 0,
      totalPayment: principal,
    }
  }

  const monthlyRate = annualRate / 12 / 100
  const emi =
    (principal * monthlyRate * (1 + monthlyRate) ** months) /
    ((1 + monthlyRate) ** months - 1)

  return {
    emi,
    totalInterest: emi * months - principal,
    totalPayment: emi * months,
  }
}
