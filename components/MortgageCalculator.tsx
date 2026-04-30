"use client";
import { useState } from "react";
import { Calculator, DollarSign, Home, Percent, Calendar, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("500000");
  const [downPayment, setDownPayment] = useState("100000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [additionalPayment, setAdditionalPayment] = useState("0");
  const [showResults, setShowResults] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    const extraPayment = parseFloat(additionalPayment) || 0;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate with additional payment
    const totalMonthly = monthlyPayment + extraPayment;
    
    // Generate amortization schedule
    const schedule = [];
    let balance = principal;
    let totalInterestPaid = 0;
    let month = 0;
    
    while (balance > 0 && month < numPayments * 2) {
      month++;
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balance);
      const extraPrincipalPayment = Math.min(extraPayment, balance - principalPayment);
      
      totalInterestPaid += interestPayment;
      balance -= (principalPayment + extraPrincipalPayment);
      
      if (month <= 360) { // Limit schedule display
        schedule.push({
          month,
          payment: totalMonthly,
          principal: principalPayment + extraPrincipalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        });
      }
    }
    
    const actualTotal = totalMonthly * month - (totalMonthly - (monthlyPayment + extraPayment)) * (month - schedule.length);
    
    return {
      monthly: monthlyPayment.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      total: actualTotal.toFixed(2),
      totalInterest: totalInterestPaid.toFixed(2),
      totalMonths: month,
      schedule: schedule.slice(0, 12) // Show first year
    };
  };

  const results = showResults ? calculateMortgage() : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center mb-6">
        <Calculator className="w-8 h-8 text-accent mr-3" />
        <h3 className="text-2xl font-serif font-bold text-foreground">Mortgage Calculator</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="flex items-center text-sm font-medium text-muted-foreground mb-2">
            <Home className="w-4 h-4 mr-2" /> Home Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="500000"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-muted-foreground mb-2">
            <DollarSign className="w-4 h-4 mr-2" /> Down Payment
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="100000"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-muted-foreground mb-2">
            <Percent className="w-4 h-4 mr-2" /> Interest Rate
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full pr-8 pl-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="6.5"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-muted-foreground mb-2">
            <Calendar className="w-4 h-4 mr-2" /> Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="15">15 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center text-sm font-medium text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 mr-2" /> Additional Monthly Payment
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={additionalPayment}
              onChange={(e) => setAdditionalPayment(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">Optional</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Extra principal payment to pay off loan faster</p>
        </div>
      </div>

      <Button 
        onClick={() => setShowResults(true)} 
        className="w-full mb-6" 
        size="lg"
      >
        Calculate Payment
      </Button>

      {showResults && results && (
        <div className="space-y-6">
          <div className="bg-muted rounded-xl p-6">
            <h4 className="font-bold text-lg text-foreground mb-4">Payment Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                <p className="text-2xl font-bold text-primary">${results.monthly}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">With Extra Payment</p>
                <p className="text-2xl font-bold text-primary">${results.totalMonthly}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-accent">${results.totalInterest}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Payoff Time</p>
                <p className="text-2xl font-bold text-foreground">{Math.ceil(results.totalMonths / 12)} years</p>
              </div>
            </div>
            {parseFloat(additionalPayment) > 0 && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  💰 You'll save thousands in interest and pay off your loan {Math.ceil((parseFloat(loanTerm) * 12 - results.totalMonths) / 12)} years early!
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowSchedule(!showSchedule)}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
            </Button>
          </div>

          {showSchedule && (
            <div className="bg-muted rounded-xl p-6">
              <h4 className="font-bold text-lg text-foreground mb-4">First Year Amortization Schedule</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-2">Month</th>
                      <th className="text-right p-2">Payment</th>
                      <th className="text-right p-2">Principal</th>
                      <th className="text-right p-2">Interest</th>
                      <th className="text-right p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map((row) => (
                      <tr key={row.month} className="border-b border-gray-100">
                        <td className="p-2">{row.month}</td>
                        <td className="text-right p-2">${row.payment.toFixed(2)}</td>
                        <td className="text-right p-2">${row.principal.toFixed(2)}</td>
                        <td className="text-right p-2">${row.interest.toFixed(2)}</td>
                        <td className="text-right p-2">${row.balance.toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Showing first year only. Full schedule available upon request.
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            *This is an estimate only. Actual rates and terms may vary.
          </p>
        </div>
      )}
    </div>
  );
}
