"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  FileText,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  taxes: number;
  insurance: number;
  pmi: number;
  extraPrincipal: number;
  balance: number;
};

type MortgageResults = {
  monthlyPI: number;
  firstMonthPmi: number;
  totalInterest: number;
  totalPaid: number;
  totalPmi: number;
  months: number;
  payoffDate: Date;
  schedule: ScheduleRow[];
};

const DEFAULT_VALUES = {
  loanAmount: "400000",
  downPayment: "100000",
  interestRate: "6.5",
  loanTerm: "30",
  propertyTaxes: "6000",
  homeInsurance: "1800",
  pmiRate: "0.5",
  additionalMonthlyPayment: "0",
  oneTimeExtraPayment: "0",
  oneTimeExtraMonth: "12",
};

const inputClassName =
  "w-full min-h-[2.75rem] rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:min-h-0 sm:text-sm";

function toNumber(value: string) {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyPrecise(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatTerm(months: number) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years <= 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function calculateMonthlyPI(
  principal: number,
  monthlyRate: number,
  totalPayments: number
) {
  if (principal <= 0 || totalPayments <= 0) return 0;
  if (monthlyRate === 0) return principal / totalPayments;

  const factor = Math.pow(1 + monthlyRate, totalPayments);

  return (principal * monthlyRate * factor) / (factor - 1);
}

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(DEFAULT_VALUES.loanAmount);
  const [downPayment, setDownPayment] = useState(DEFAULT_VALUES.downPayment);
  const [interestRate, setInterestRate] = useState(DEFAULT_VALUES.interestRate);
  const [loanTerm, setLoanTerm] = useState(DEFAULT_VALUES.loanTerm);
  const [propertyTaxes, setPropertyTaxes] = useState(
    DEFAULT_VALUES.propertyTaxes
  );
  const [homeInsurance, setHomeInsurance] = useState(
    DEFAULT_VALUES.homeInsurance
  );
  const [pmiRate, setPmiRate] = useState(DEFAULT_VALUES.pmiRate);
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState(
    DEFAULT_VALUES.additionalMonthlyPayment
  );
  const [oneTimeExtraPayment, setOneTimeExtraPayment] = useState(
    DEFAULT_VALUES.oneTimeExtraPayment
  );
  const [oneTimeExtraMonth, setOneTimeExtraMonth] = useState(
    DEFAULT_VALUES.oneTimeExtraMonth
  );
  const [showSchedule, setShowSchedule] = useState(false);

  const values = useMemo(() => {
    const loanAmountNum = Math.max(0, toNumber(loanAmount));
    const downPaymentNum = Math.max(0, toNumber(downPayment));
    const interestRateNum = Math.max(0, toNumber(interestRate));
    const loanTermYears = Math.max(1, toNumber(loanTerm));
    const propertyTaxesAnnual = Math.max(0, toNumber(propertyTaxes));
    const homeInsuranceAnnual = Math.max(0, toNumber(homeInsurance));
    const pmiRateAnnual = Math.max(0, toNumber(pmiRate));
    const additionalMonthlyPaymentNum = Math.max(
      0,
      toNumber(additionalMonthlyPayment)
    );
    const oneTimeExtraPaymentNum = Math.max(0, toNumber(oneTimeExtraPayment));
    const totalPayments = Math.round(loanTermYears * 12);
    const oneTimeExtraMonthNum = Math.min(
      totalPayments,
      Math.max(1, Math.round(toNumber(oneTimeExtraMonth) || 1))
    );

    const estimatedPurchasePrice = loanAmountNum + downPaymentNum;
    const downPaymentPercent =
      estimatedPurchasePrice > 0
        ? (downPaymentNum / estimatedPurchasePrice) * 100
        : 0;
    const ltv =
      estimatedPurchasePrice > 0
        ? (loanAmountNum / estimatedPurchasePrice) * 100
        : 0;

    return {
      loanAmountNum,
      downPaymentNum,
      interestRateNum,
      loanTermYears,
      propertyTaxesAnnual,
      homeInsuranceAnnual,
      pmiRateAnnual,
      additionalMonthlyPaymentNum,
      oneTimeExtraPaymentNum,
      oneTimeExtraMonthNum,
      totalPayments,
      estimatedPurchasePrice,
      downPaymentPercent,
      ltv,
    };
  }, [
    loanAmount,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxes,
    homeInsurance,
    pmiRate,
    additionalMonthlyPayment,
    oneTimeExtraPayment,
    oneTimeExtraMonth,
  ]);

  const calculations = useMemo(() => {
    const monthlyRate = values.interestRateNum / 100 / 12;
    const monthlyTaxes = values.propertyTaxesAnnual / 12;
    const monthlyInsurance = values.homeInsuranceAnnual / 12;
    const pmiRequired =
      values.downPaymentPercent < 20 &&
      values.pmiRateAnnual > 0 &&
      values.estimatedPurchasePrice > 0;

    const monthlyPmiAmount = pmiRequired
      ? (values.loanAmountNum * (values.pmiRateAnnual / 100)) / 12
      : 0;

    const buildSchedule = (withExtras: boolean): MortgageResults => {
      if (values.loanAmountNum <= 0 || values.totalPayments <= 0) {
        return {
          monthlyPI: 0,
          firstMonthPmi: 0,
          totalInterest: 0,
          totalPaid: 0,
          totalPmi: 0,
          months: 0,
          payoffDate: new Date(),
          schedule: [],
        };
      }

      const monthlyPI = calculateMonthlyPI(
        values.loanAmountNum,
        monthlyRate,
        values.totalPayments
      );

      let balance = values.loanAmountNum;
      let month = 0;
      let totalInterest = 0;
      let totalPaid = 0;
      let totalPmi = 0;

      const schedule: ScheduleRow[] = [];

      while (balance > 0.01 && month < values.totalPayments + 600) {
        month += 1;

        const interest = monthlyRate > 0 ? balance * monthlyRate : 0;

        let scheduledPrincipal =
          monthlyRate > 0 ? monthlyPI - interest : values.loanAmountNum / values.totalPayments;

        if (!Number.isFinite(scheduledPrincipal) || scheduledPrincipal < 0) {
          scheduledPrincipal = 0;
        }

        const currentPmi =
          pmiRequired && balance > values.estimatedPurchasePrice * 0.8
            ? monthlyPmiAmount
            : 0;

        let extraPrincipal = 0;

        if (withExtras) {
          extraPrincipal += values.additionalMonthlyPaymentNum;

          if (
            values.oneTimeExtraPaymentNum > 0 &&
            month === values.oneTimeExtraMonthNum
          ) {
            extraPrincipal += values.oneTimeExtraPaymentNum;
          }
        }

        if (scheduledPrincipal > balance) {
          scheduledPrincipal = balance;
        }

        if (scheduledPrincipal + extraPrincipal > balance) {
          extraPrincipal = Math.max(0, balance - scheduledPrincipal);
        }

        const totalPrincipal = scheduledPrincipal + extraPrincipal;
        const totalPayment =
          interest +
          totalPrincipal +
          monthlyTaxes +
          monthlyInsurance +
          currentPmi;

        balance = Math.max(0, balance - totalPrincipal);
        totalInterest += interest;
        totalPmi += currentPmi;
        totalPaid += totalPayment;

        schedule.push({
          month,
          payment: totalPayment,
          principal: scheduledPrincipal,
          interest,
          taxes: monthlyTaxes,
          insurance: monthlyInsurance,
          pmi: currentPmi,
          extraPrincipal,
          balance,
        });

        if (totalPrincipal <= 0 && interest <= 0) {
          break;
        }
      }

      return {
        monthlyPI,
        firstMonthPmi: schedule[0]?.pmi ?? 0,
        totalInterest,
        totalPaid,
        totalPmi,
        months: schedule.length,
        payoffDate: addMonths(new Date(), schedule.length),
        schedule,
      };
    };

    const base = buildSchedule(false);
    const withExtras = buildSchedule(true);

    return {
      base,
      withExtras,
      monthlyTaxes,
      monthlyInsurance,
      pmiRequired,
      monthlyPmiAmount,
    };
  }, [values]);

  const hasExtraPayments =
    values.additionalMonthlyPaymentNum > 0 || values.oneTimeExtraPaymentNum > 0;

  const activeResults = hasExtraPayments
    ? calculations.withExtras
    : calculations.base;

  const baseMonthlyPayment =
    calculations.base.monthlyPI +
    calculations.monthlyTaxes +
    calculations.monthlyInsurance +
    calculations.base.firstMonthPmi;

  const monthlyPaymentWithExtra =
    baseMonthlyPayment + values.additionalMonthlyPaymentNum;

  const monthsSaved = Math.max(
    0,
    calculations.base.months - calculations.withExtras.months
  );

  const interestSaved = Math.max(
    0,
    calculations.base.totalInterest - calculations.withExtras.totalInterest
  );

  const totalSaved = Math.max(
    0,
    calculations.base.totalPaid - calculations.withExtras.totalPaid
  );

  const resetDefaults = () => {
    setLoanAmount(DEFAULT_VALUES.loanAmount);
    setDownPayment(DEFAULT_VALUES.downPayment);
    setInterestRate(DEFAULT_VALUES.interestRate);
    setLoanTerm(DEFAULT_VALUES.loanTerm);
    setPropertyTaxes(DEFAULT_VALUES.propertyTaxes);
    setHomeInsurance(DEFAULT_VALUES.homeInsurance);
    setPmiRate(DEFAULT_VALUES.pmiRate);
    setAdditionalMonthlyPayment(DEFAULT_VALUES.additionalMonthlyPayment);
    setOneTimeExtraPayment(DEFAULT_VALUES.oneTimeExtraPayment);
    setOneTimeExtraMonth(DEFAULT_VALUES.oneTimeExtraMonth);
    setShowSchedule(false);
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
      <div className="border-b border-gray-100 bg-gradient-to-br from-muted/70 via-white to-white p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 sm:gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Calculator className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-montserrat font-bold text-foreground sm:text-2xl">
                Mortgage Calculator
              </h3>
              <p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                Calculate estimated monthly payment, taxes, insurance, PMI,
                amortization, and payoff savings with extra principal and
                prepayments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-center sm:rounded-2xl sm:px-4 sm:py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Estimated Price
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatCurrency(values.estimatedPurchasePrice)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-center sm:rounded-2xl sm:px-4 sm:py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Down Payment
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatPercent(values.downPaymentPercent)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-center sm:rounded-2xl sm:px-4 sm:py-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                LTV
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {formatPercent(values.ltv)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-12">
          <div className="min-w-0 space-y-4 sm:space-y-6 xl:col-span-5">
            <div className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6">
              <h4 className="mb-4 text-base font-montserrat font-bold text-foreground sm:mb-5 sm:text-lg">
                Loan Details
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className={inputClassName}
                    placeholder="400000"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Down Payment
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className={inputClassName}
                    placeholder="100000"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <Percent className="mr-2 h-4 w-4" />
                    Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className={`${inputClassName} pr-10`}
                      placeholder="6.5"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Loan Term
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className={inputClassName}
                  >
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                    <option value="20">20 years</option>
                    <option value="25">25 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
                Estimated purchase price:{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(values.estimatedPurchasePrice)}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center gap-2 sm:mb-5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h4 className="text-base font-montserrat font-bold text-foreground sm:text-lg">
                  Taxes, Insurance & PMI
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Property Taxes / Year
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={propertyTaxes}
                    onChange={(e) => setPropertyTaxes(e.target.value)}
                    className={inputClassName}
                    placeholder="6000"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Home Insurance / Year
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className={inputClassName}
                    placeholder="1800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <Percent className="mr-2 h-4 w-4" />
                    PMI Rate / Year
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={pmiRate}
                      onChange={(e) => setPmiRate(e.target.value)}
                      className={`${inputClassName} pr-10`}
                      placeholder="0.5"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {calculations.pmiRequired
                      ? "PMI is currently included and is estimated to drop off once the loan balance reaches 80% of the estimated purchase price."
                      : "PMI is not currently included because the down payment is 20% or more, or PMI rate is set to 0%."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center gap-2 sm:mb-5">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h4 className="text-base font-montserrat font-bold text-foreground sm:text-lg">
                  Extra Payments
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Additional Monthly Principal
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={additionalMonthlyPayment}
                    onChange={(e) =>
                      setAdditionalMonthlyPayment(e.target.value)
                    }
                    className={inputClassName}
                    placeholder="0"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Extra principal added to each monthly payment.
                  </p>
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" />
                    One-Time Prepayment
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={oneTimeExtraPayment}
                    onChange={(e) => setOneTimeExtraPayment(e.target.value)}
                    className={inputClassName}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Apply in Month
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={values.totalPayments}
                    value={oneTimeExtraMonth}
                    onChange={(e) => setOneTimeExtraMonth(e.target.value)}
                    className={inputClassName}
                    placeholder="12"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-4 sm:space-y-6 xl:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-muted/50 p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-muted-foreground">Loan Amount</p>
                <p className="mt-1.5 text-xl font-bold text-foreground sm:mt-2 sm:text-2xl">
                  {formatCurrency(values.loanAmountNum)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-muted/50 p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-muted-foreground">
                  Monthly Payment
                </p>
                <p className="mt-1.5 text-xl font-bold text-primary sm:mt-2 sm:text-2xl">
                  {formatCurrency(baseMonthlyPayment)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-muted/50 p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-muted-foreground">Payoff Estimate</p>
                <p className="mt-1.5 text-xl font-bold text-foreground sm:mt-2 sm:text-2xl">
                  {formatTerm(activeResults.months)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-muted-foreground">
                  Principal & Interest
                </p>
                <p className="mt-1.5 text-lg font-bold text-foreground sm:mt-2 sm:text-xl">
                  {formatCurrency(calculations.base.monthlyPI)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-muted-foreground">
                  Taxes + Insurance
                </p>
                <p className="mt-1.5 text-lg font-bold text-foreground sm:mt-2 sm:text-xl">
                  {formatCurrency(
                    calculations.monthlyTaxes + calculations.monthlyInsurance
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-muted-foreground">PMI (Monthly)</p>
                <p className="mt-1.5 text-lg font-bold text-foreground sm:mt-2 sm:text-xl">
                  {formatCurrency(calculations.base.firstMonthPmi)}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6">
              <h4 className="mb-4 text-base font-montserrat font-bold text-foreground sm:mb-5 sm:text-lg">
                Payment Breakdown
              </h4>

              <div className="space-y-4">
                <div className="flex flex-col gap-1 rounded-xl bg-muted/50 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    Estimated monthly payment
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(baseMonthlyPayment)}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    Principal & interest
                  </span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(calculations.base.monthlyPI)}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    Property taxes
                  </span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(calculations.monthlyTaxes)}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    Home insurance
                  </span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(calculations.monthlyInsurance)}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    PMI
                  </span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(calculations.base.firstMonthPmi)}
                  </span>
                </div>

                {values.additionalMonthlyPaymentNum > 0 && (
                  <div className="flex flex-col gap-0.5 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      Additional monthly principal
                    </span>
                    <span className="font-medium text-primary">
                      +{formatCurrency(values.additionalMonthlyPaymentNum)}
                    </span>
                  </div>
                )}

                {values.oneTimeExtraPaymentNum > 0 && (
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      One-time prepayment
                    </span>
                    <span className="font-medium text-primary sm:text-right">
                      {formatCurrency(values.oneTimeExtraPaymentNum)} in month{" "}
                      {values.oneTimeExtraMonthNum}
                    </span>
                  </div>
                )}

                {values.additionalMonthlyPaymentNum > 0 && (
                  <div className="flex flex-col gap-1 rounded-xl bg-primary/5 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
                    <span className="text-xs font-medium text-primary sm:text-sm">
                      Monthly payment with extra principal
                    </span>
                    <span className="font-semibold text-primary">
                      {formatCurrency(monthlyPaymentWithExtra)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {hasExtraPayments ? (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:rounded-2xl sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <PiggyBank className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h4 className="text-lg font-montserrat font-bold text-foreground">
                      Extra Payment Savings
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Based on your current extra payment settings, here is the
                      updated payoff estimate.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl bg-white/80 p-4">
                    <p className="text-sm text-muted-foreground">
                      New payoff estimate
                    </p>
                    <p className="mt-2 text-lg font-bold text-foreground">
                      {formatTerm(calculations.withExtras.months)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {calculations.withExtras.payoffDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/80 p-4">
                    <p className="text-sm text-muted-foreground">
                      Time saved
                    </p>
                    <p className="mt-2 text-lg font-bold text-primary">
                      {formatTerm(monthsSaved)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/80 p-4">
                    <p className="text-sm text-muted-foreground">
                      Interest saved
                    </p>
                    <p className="mt-2 text-lg font-bold text-primary">
                      {formatCurrency(interestSaved)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/80 p-4">
                    <p className="text-sm text-muted-foreground">
                      Total estimated savings
                    </p>
                    <p className="mt-2 text-lg font-bold text-primary">
                      {formatCurrency(totalSaved)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 bg-muted/40 p-4 sm:rounded-2xl sm:p-6">
                <h4 className="text-base font-montserrat font-bold text-foreground sm:text-lg">
                  Want to pay off your loan faster?
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Add an extra monthly principal payment or a one-time
                  prepayment to see how much interest you could save and how much
                  sooner you could pay off the loan.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <Button
            variant="outline"
            onClick={resetDefaults}
            className="w-full min-h-[2.75rem] sm:w-auto sm:min-h-10"
          >
            Reset Defaults
          </Button>

          <Button
            onClick={() => setShowSchedule(!showSchedule)}
            className="flex min-h-[2.75rem] w-full items-center justify-center gap-2 sm:w-auto sm:min-h-10"
          >
            <FileText className="h-4 w-4" />
            {showSchedule ? "Hide" : "Show"} Amortization Schedule
          </Button>
        </div>

        {showSchedule && (
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 sm:mt-8 sm:rounded-2xl">
            <div className="border-b border-gray-100 bg-muted/50 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-lg font-montserrat font-bold text-foreground">
                    Amortization Schedule
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {hasExtraPayments
                      ? "Showing updated schedule with your extra payment settings."
                      : "Showing standard mortgage amortization schedule."}
                  </p>
                </div>

                <div className="text-sm text-muted-foreground">
                  {activeResults.schedule.length} total payments
                </div>
              </div>
            </div>

            <div className="max-h-[min(70vh,28rem)] overflow-x-auto overflow-y-auto sm:max-h-[560px]">
              <table className="w-full min-w-[720px] text-xs sm:min-w-[980px] sm:text-sm">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-2 py-2 font-semibold text-foreground sm:px-4 sm:py-3">
                      Month
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Payment
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Principal
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Interest
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Taxes
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Insurance
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      PMI
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Extra
                    </th>
                    <th className="px-2 py-2 text-right font-semibold text-foreground sm:px-4 sm:py-3">
                      Balance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activeResults.schedule.map((row) => (
                    <tr key={row.month} className="border-b border-gray-100">
                      <td className="px-2 py-2 text-foreground sm:px-4 sm:py-3">{row.month}</td>
                      <td className="px-2 py-2 text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.payment)}
                      </td>
                      <td className="px-2 py-2 text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.principal)}
                      </td>
                      <td className="px-2 py-2 text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.interest)}
                      </td>
                      <td className="px-2 py-2 text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.taxes)}
                      </td>
                      <td className="px-2 py-2 text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.insurance)}
                      </td>
                      <td className="px-2 py-2 text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.pmi)}
                      </td>
                      <td className="px-2 py-2 text-right text-primary sm:px-4 sm:py-3">
                        {row.extraPrincipal > 0
                          ? formatCurrencyPrecise(row.extraPrincipal)
                          : "—"}
                      </td>
                      <td className="px-2 py-2 text-right font-medium text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs leading-6 text-muted-foreground">
          * This calculator provides estimates only. Actual mortgage payment,
          taxes, insurance, PMI, rates, fees, and loan terms may vary.
        </div>
      </div>
    </div>
  );
}