export interface InvestmentPoint {
  year: number
  total: number
  principal: number
  profit: number
}

export const calculateInvestment = (
  monthlyAmount: number,
  annualRate: number,
  years: number,
): InvestmentPoint[] => {
  const monthlyRate = annualRate / 100 / 12
  const totalData: InvestmentPoint[] = []
  let currentBalance = 0
  let totalPrincipal = 0

  for (let month = 1; month <= years * 12; month += 1) {
    currentBalance = (currentBalance + monthlyAmount) * (1 + monthlyRate)
    totalPrincipal += monthlyAmount

    if (month % 12 === 0) {
      totalData.push({
        year: month / 12,
        total: Math.round(currentBalance),
        principal: Math.round(totalPrincipal),
        profit: Math.round(currentBalance - totalPrincipal),
      })
    }
  }

  return totalData
}
