"use client";
import { useState } from "react";
import { Calculator, DollarSign, Home, Percent, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("500000");
  const [downPayment, setDownPayment] = useState("100000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [showResults, setShowResults] = useState(false);

  const calculateMortgage = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return {
      monthly: monthlyPayment.toFixed(2),
      total: (monthlyPayment * numPayments).toFixed(2),
      totalInterest: (monthlyPayment * numPayments - principal).toFixed(2)
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
      </div>

      <Button 
        onClick={() => setShowResults(true)} 
        className="w-full mb-6" 
        size="lg"
      >
        Calculate Payment
      </Button>

      {showResults && results && (
        <div className="bg-muted rounded-xl p-6 space-y-4">
          <h4 className="font-bold text-lg text-foreground mb-4">Payment Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
              <p className="text-2xl font-bold text-primary">${results.monthly}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-foreground">${results.total}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-accent">${results.totalInterest}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            *This is an estimate only. Actual rates and terms may vary.
          </p>
        </div>
      )}
    </div>
  );
}
