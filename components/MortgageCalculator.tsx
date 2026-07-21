"use client";

import { useMemo, useState, useId, type ReactNode } from "react";
import {
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  FileText,
  PiggyBank,
  ShieldCheck,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  taxes: number;
  insurance: number;
  hoa: number;
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
  hoaMonthly: "0",
  pmiRate: "0.5",
  additionalMonthlyPayment: "0",
  oneTimeExtraPayment: "0",
  oneTimeExtraMonth: "12",
};

function toNumber(value: string): number {
  const parsed = parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyPrecise(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatTerm(months: number): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years <= 0) return `${rem} mo`;
  if (rem === 0) return `${years} yr`;
  return `${years} yr ${rem} mo`;
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function calculateMonthlyPI(
  principal: number,
  monthlyRate: number,
  totalPayments: number
): number {
  if (principal <= 0 || totalPayments <= 0) return 0;
  if (monthlyRate === 0) return principal / totalPayments;
  const factor = Math.pow(1 + monthlyRate, totalPayments);
  return (principal * monthlyRate * factor) / (factor - 1);
}

const inputBase =
  "w-full min-h-[2.75rem] rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:min-h-0 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed";

type InputFieldProps = {
  label: string;
  icon?: ReactNode;
  value: string;
  onChange: (v: string) => void;
  type?: "number" | "select";
  min?: string;
  max?: string;
  step?: string;
  placeholder?: string;
  suffix?: string;
  hint?: string;
  options?: { value: string; label: string }[];
  colSpan?: boolean;
};

function InputField({
  label,
  icon,
  value,
  onChange,
  type = "number",
  min,
  max,
  step,
  placeholder,
  suffix,
  hint,
  options,
  colSpan,
}: InputFieldProps) {
  const id = useId();

  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground"
      >
        {icon}
        {label}
      </label>

      {type === "select" && options ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : suffix ? (
        <div className="relative">
          <input
            id={id}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBase} pr-10`}
            placeholder={placeholder}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        </div>
      ) : (
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputBase}
          placeholder={placeholder}
        />
      )}

      {hint && <p className="mt-2 text-xs leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
};

function StatCard({ label, value, highlight, muted }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 sm:rounded-2xl sm:p-5 ${
        muted ? "border-gray-100 bg-muted/50" : "border-gray-100 bg-white"
      }`}
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`mt-1.5 text-xl font-bold sm:mt-2 sm:text-2xl ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>(DEFAULT_VALUES.loanAmount);
  const [downPayment, setDownPayment] = useState<string>(DEFAULT_VALUES.downPayment);
  const [interestRate, setInterestRate] = useState<string>(DEFAULT_VALUES.interestRate);
  const [loanTerm, setLoanTerm] = useState<string>(DEFAULT_VALUES.loanTerm);
  const [propertyTaxes, setPropertyTaxes] = useState<string>(DEFAULT_VALUES.propertyTaxes);
  const [homeInsurance, setHomeInsurance] = useState<string>(DEFAULT_VALUES.homeInsurance);
  const [hoaMonthly, setHoaMonthly] = useState<string>(DEFAULT_VALUES.hoaMonthly);
  const [pmiRate, setPmiRate] = useState<string>(DEFAULT_VALUES.pmiRate);
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState<string>(
    DEFAULT_VALUES.additionalMonthlyPayment
  );
  const [oneTimeExtraPayment, setOneTimeExtraPayment] = useState<string>(
    DEFAULT_VALUES.oneTimeExtraPayment
  );
  const [oneTimeExtraMonth, setOneTimeExtraMonth] = useState<string>(
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
    const hoaMonthlyNum = Math.max(0, toNumber(hoaMonthly));
    const pmiRateAnnual = Math.max(0, toNumber(pmiRate));
    const additionalMonthlyPaymentNum = Math.max(0, toNumber(additionalMonthlyPayment));
    const oneTimeExtraPaymentNum = Math.max(0, toNumber(oneTimeExtraPayment));
    const totalPayments = Math.round(loanTermYears * 12);
    const oneTimeExtraMonthNum = Math.min(
      totalPayments,
      Math.max(1, Math.round(toNumber(oneTimeExtraMonth) || 1))
    );
    const estimatedPurchasePrice = loanAmountNum + downPaymentNum;
    const downPaymentPercent =
      estimatedPurchasePrice > 0 ? (downPaymentNum / estimatedPurchasePrice) * 100 : 0;
    const ltv = estimatedPurchasePrice > 0 ? (loanAmountNum / estimatedPurchasePrice) * 100 : 0;

    return {
      loanAmountNum,
      downPaymentNum,
      interestRateNum,
      loanTermYears,
      propertyTaxesAnnual,
      homeInsuranceAnnual,
      hoaMonthlyNum,
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
    hoaMonthly,
    pmiRate,
    additionalMonthlyPayment,
    oneTimeExtraPayment,
    oneTimeExtraMonth,
  ]);

  const calculations = useMemo(() => {
    const monthlyRate = values.interestRateNum / 100 / 12;
    const monthlyTaxes = values.propertyTaxesAnnual / 12;
    const monthlyInsurance = values.homeInsuranceAnnual / 12;
    const monthlyHoa = values.hoaMonthlyNum;
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

      const monthlyPI = calculateMonthlyPI(values.loanAmountNum, monthlyRate, values.totalPayments);

      let balance = values.loanAmountNum;
      let month = 0;
      let totalInterest = 0;
      let totalPaid = 0;
      let totalPmi = 0;
      const schedule: ScheduleRow[] = [];

      while (balance > 0.01 && month < values.totalPayments + 600) {
        month++;
        const interest = monthlyRate > 0 ? balance * monthlyRate : 0;
        let scheduledPrincipal =
          monthlyRate > 0 ? monthlyPI - interest : values.loanAmountNum / values.totalPayments;

        if (!Number.isFinite(scheduledPrincipal) || scheduledPrincipal < 0) {
          scheduledPrincipal = 0;
        }

        const currentPmi =
          pmiRequired && balance > values.estimatedPurchasePrice * 0.8 ? monthlyPmiAmount : 0;

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

        if (scheduledPrincipal > balance) scheduledPrincipal = balance;
        if (scheduledPrincipal + extraPrincipal > balance) {
          extraPrincipal = Math.max(0, balance - scheduledPrincipal);
        }

        const totalPrincipal = scheduledPrincipal + extraPrincipal;
        const totalPayment =
          interest + totalPrincipal + monthlyTaxes + monthlyInsurance + monthlyHoa + currentPmi;

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
          hoa: monthlyHoa,
          pmi: currentPmi,
          extraPrincipal,
          balance,
        });

        if (totalPrincipal <= 0 && interest <= 0) break;
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

    return {
      base: buildSchedule(false),
      withExtras: buildSchedule(true),
      monthlyTaxes,
      monthlyInsurance,
      monthlyHoa,
      pmiRequired,
      monthlyPmiAmount,
    };
  }, [values]);

  const hasExtraPayments =
    values.additionalMonthlyPaymentNum > 0 || values.oneTimeExtraPaymentNum > 0;

  const activeResults = hasExtraPayments ? calculations.withExtras : calculations.base;

  const baseMonthlyPayment =
    calculations.base.monthlyPI +
    calculations.monthlyTaxes +
    calculations.monthlyInsurance +
    calculations.monthlyHoa +
    calculations.base.firstMonthPmi;

  const monthlyPaymentWithExtra = baseMonthlyPayment + values.additionalMonthlyPaymentNum;

  const monthsSaved = Math.max(0, calculations.base.months - calculations.withExtras.months);
  const interestSaved = Math.max(
    0,
    calculations.base.totalInterest - calculations.withExtras.totalInterest
  );
  const totalSaved = Math.max(0, calculations.base.totalPaid - calculations.withExtras.totalPaid);

  const resetDefaults = () => {
    setLoanAmount(DEFAULT_VALUES.loanAmount);
    setDownPayment(DEFAULT_VALUES.downPayment);
    setInterestRate(DEFAULT_VALUES.interestRate);
    setLoanTerm(DEFAULT_VALUES.loanTerm);
    setPropertyTaxes(DEFAULT_VALUES.propertyTaxes);
    setHomeInsurance(DEFAULT_VALUES.homeInsurance);
    setHoaMonthly(DEFAULT_VALUES.hoaMonthly);
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
              <Calculator className="h-6 w-6 text-primary sm:h-7 sm:w-7" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-montserrat font-bold text-foreground sm:text-2xl">
                Mortgage Calculator
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                Estimate monthly payment, taxes, insurance, HOA, PMI, amortization,
                and payoff savings with extra payments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Est. Price", value: formatCurrency(values.estimatedPurchasePrice) },
              { label: "Down Payment", value: formatPercent(values.downPaymentPercent) },
              { label: "LTV", value: formatPercent(values.ltv) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 bg-white px-2 py-2 text-center sm:rounded-2xl sm:px-4 sm:py-3"
              >
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
                  {stat.label}
                </p>
                <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-12">
          <div className="min-w-0 space-y-4 sm:space-y-6 xl:col-span-5">
            <section
              aria-labelledby="loan-details-heading"
              className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6"
            >
              <h4
                id="loan-details-heading"
                className="mb-4 text-base font-montserrat font-bold text-foreground sm:mb-5 sm:text-lg"
              >
                Loan Details
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Loan Amount"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min="0"
                  placeholder="400000"
                />
                <InputField
                  label="Down Payment"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={downPayment}
                  onChange={setDownPayment}
                  min="0"
                  placeholder="100000"
                />
                <InputField
                  label="Interest Rate"
                  icon={<Percent className="h-4 w-4" aria-hidden="true" />}
                  value={interestRate}
                  onChange={setInterestRate}
                  min="0"
                  step="0.01"
                  placeholder="6.5"
                  suffix="%"
                />
                <InputField
                  label="Loan Term"
                  icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
                  value={loanTerm}
                  onChange={setLoanTerm}
                  type="select"
                  options={[
                    { value: "10", label: "10 years" },
                    { value: "15", label: "15 years" },
                    { value: "20", label: "20 years" },
                    { value: "25", label: "25 years" },
                    { value: "30", label: "30 years" },
                  ]}
                />
              </div>
              <div className="mt-4 rounded-xl bg-muted/60 px-4 py-3 text-sm text-muted-foreground">
                Estimated purchase price:{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(values.estimatedPurchasePrice)}
                </span>
              </div>
            </section>

            <section
              aria-labelledby="taxes-heading"
              className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6"
            >
              <div className="mb-4 flex items-center gap-2 sm:mb-5">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                <h4
                  id="taxes-heading"
                  className="text-base font-montserrat font-bold text-foreground sm:text-lg"
                >
                  Taxes, Insurance, HOA & PMI
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Property Taxes / Year"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={propertyTaxes}
                  onChange={setPropertyTaxes}
                  min="0"
                  placeholder="6000"
                />
                <InputField
                  label="Home Insurance / Year"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={homeInsurance}
                  onChange={setHomeInsurance}
                  min="0"
                  placeholder="1800"
                />
                <InputField
                  label="HOA / Month"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={hoaMonthly}
                  onChange={setHoaMonthly}
                  min="0"
                  placeholder="0"
                />
                <InputField
                  label="PMI Rate / Year"
                  icon={<Percent className="h-4 w-4" aria-hidden="true" />}
                  value={pmiRate}
                  onChange={setPmiRate}
                  min="0"
                  step="0.01"
                  placeholder="0.5"
                  suffix="%"
                  colSpan
                  hint={
                    calculations.pmiRequired
                      ? "PMI is included. It will drop off once the loan balance reaches 80% of the estimated purchase price."
                      : "PMI is not included — down payment is 20% or more, or PMI rate is 0%."
                  }
                />
              </div>
            </section>

            <section
              aria-labelledby="extra-payments-heading"
              className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6"
            >
              <div className="mb-4 flex items-center gap-2 sm:mb-5">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                <h4
                  id="extra-payments-heading"
                  className="text-base font-montserrat font-bold text-foreground sm:text-lg"
                >
                  Extra Payments
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Additional Monthly Principal"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={additionalMonthlyPayment}
                  onChange={setAdditionalMonthlyPayment}
                  min="0"
                  placeholder="0"
                  colSpan
                  hint="Extra principal added to each monthly payment."
                />
                <InputField
                  label="One-Time Prepayment"
                  icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
                  value={oneTimeExtraPayment}
                  onChange={setOneTimeExtraPayment}
                  min="0"
                  placeholder="0"
                />
                <InputField
                  label="Apply in Month"
                  icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
                  value={oneTimeExtraMonth}
                  onChange={setOneTimeExtraMonth}
                  min="1"
                  max={String(values.totalPayments)}
                  placeholder="12"
                />
              </div>
            </section>
          </div>

          <div className="min-w-0 space-y-4 sm:space-y-6 xl:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              <StatCard label="Loan Amount" value={formatCurrency(values.loanAmountNum)} muted />
              <StatCard
                label="Monthly Payment"
                value={formatCurrency(baseMonthlyPayment)}
                highlight
                muted
              />
              <div className="col-span-2 xl:col-span-1">
                <StatCard label="Payoff Estimate" value={formatTerm(activeResults.months)} muted />
              </div>
              <StatCard label="Principal & Interest" value={formatCurrency(calculations.base.monthlyPI)} />
              <StatCard
                label="Taxes + Ins + HOA"
                value={formatCurrency(
                  calculations.monthlyTaxes +
                    calculations.monthlyInsurance +
                    calculations.monthlyHoa
                )}
              />
              <div className="col-span-2 xl:col-span-1">
                <StatCard label="PMI (Monthly)" value={formatCurrency(calculations.base.firstMonthPmi)} />
              </div>
            </div>

            <section
              aria-labelledby="breakdown-heading"
              className="rounded-xl border border-gray-100 p-4 sm:rounded-2xl sm:p-6"
            >
              <h4
                id="breakdown-heading"
                className="mb-4 text-base font-montserrat font-bold text-foreground sm:mb-5 sm:text-lg"
              >
                Payment Breakdown
              </h4>
              <dl className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2.5 sm:px-4 sm:py-3">
                  <dt className="text-xs text-muted-foreground sm:text-sm">
                    Estimated monthly payment
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {formatCurrency(baseMonthlyPayment)}
                  </dd>
                </div>

                {[
                  { label: "Principal & interest", value: formatCurrency(calculations.base.monthlyPI) },
                  { label: "Property taxes", value: formatCurrency(calculations.monthlyTaxes) },
                  { label: "Home insurance", value: formatCurrency(calculations.monthlyInsurance) },
                  { label: "HOA", value: formatCurrency(calculations.monthlyHoa) },
                  { label: "PMI", value: formatCurrency(calculations.base.firstMonthPmi) },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <dt className="text-xs text-muted-foreground sm:text-sm">{row.label}</dt>
                    <dd className="font-medium text-foreground">{row.value}</dd>
                  </div>
                ))}

                {values.additionalMonthlyPaymentNum > 0 && (
                  <>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:pt-4">
                      <dt className="text-xs text-muted-foreground sm:text-sm">
                        Additional monthly principal
                      </dt>
                      <dd className="font-medium text-primary">
                        +{formatCurrency(values.additionalMonthlyPaymentNum)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-primary/5 px-3 py-2.5 sm:px-4 sm:py-3">
                      <dt className="text-xs font-medium text-primary sm:text-sm">
                        Monthly with extra principal
                      </dt>
                      <dd className="font-semibold text-primary">
                        {formatCurrency(monthlyPaymentWithExtra)}
                      </dd>
                    </div>
                  </>
                )}

                {values.oneTimeExtraPaymentNum > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <dt className="text-xs text-muted-foreground sm:text-sm">
                      One-time prepayment
                    </dt>
                    <dd className="font-medium text-primary">
                      {formatCurrency(values.oneTimeExtraPaymentNum)} in month{" "}
                      {values.oneTimeExtraMonthNum}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            {hasExtraPayments ? (
              <section
                aria-labelledby="savings-heading"
                className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:rounded-2xl sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                    <PiggyBank className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4
                      id="savings-heading"
                      className="text-base font-montserrat font-bold text-foreground sm:text-lg"
                    >
                      Extra Payment Savings
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Based on your current extra payment settings.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4 xl:grid-cols-4">
                  {[
                    {
                      label: "New payoff estimate",
                      value: formatTerm(calculations.withExtras.months),
                      sub: calculations.withExtras.payoffDate.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      }),
                    },
                    { label: "Time saved", value: formatTerm(monthsSaved) },
                    { label: "Interest saved", value: formatCurrency(interestSaved) },
                    { label: "Total savings", value: formatCurrency(totalSaved) },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/80 p-3 sm:p-4">
                      <p className="text-xs text-muted-foreground sm:text-sm">{item.label}</p>
                      <p className="mt-1.5 text-base font-bold text-primary sm:mt-2 sm:text-lg">
                        {item.value}
                      </p>
                      {item.sub && (
                        <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 bg-muted/40 p-4 sm:rounded-2xl sm:p-6">
                <h4 className="text-base font-montserrat font-bold text-foreground sm:text-lg">
                  Want to pay off your loan faster?
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Add an extra monthly principal payment or a one-time prepayment
                  above to see how much interest you could save and how much
                  sooner you could pay off the loan.
                </p>
              </div>
            )}

            <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-primary/5 to-white p-4 sm:rounded-2xl sm:p-6">
              <p className="text-sm font-semibold text-foreground">
                Ready to get a personalized rate?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                These are estimates only. Talk to one of our loan officers for exact numbers.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 active:bg-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Apply Now
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="/team"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Find a Loan Officer
                </a>
              </div>
            </div>
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
            onClick={() => setShowSchedule((v) => !v)}
            className="flex min-h-[2.75rem] w-full items-center justify-center gap-2 sm:w-auto sm:min-h-10"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            {showSchedule ? "Hide" : "Show"} Amortization Schedule
          </Button>
        </div>

        {showSchedule && (
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 sm:mt-8 sm:rounded-2xl">
            <div className="border-b border-gray-100 bg-muted/50 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-base font-montserrat font-bold text-foreground sm:text-lg">
                    Amortization Schedule
                  </h4>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {hasExtraPayments
                      ? "Updated schedule with extra payment settings applied."
                      : "Standard mortgage amortization schedule."}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {activeResults.schedule.length} total payments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-b border-gray-100 bg-muted/30 px-4 py-2 text-xs text-muted-foreground sm:hidden">
              <MoveHorizontal className="h-3 w-3" aria-hidden="true" />
              Scroll horizontally to see full table
            </div>

            <div className="max-h-[min(70vh,28rem)] overflow-x-auto overflow-y-auto sm:max-h-[560px]">
              <table
                className="w-full min-w-[700px] text-xs sm:text-sm"
                aria-label="Mortgage amortization schedule"
              >
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-gray-100">
                    {[
                      { label: "Month", align: "left" },
                      { label: "Payment", align: "right" },
                      { label: "Principal", align: "right" },
                      { label: "Interest", align: "right" },
                      { label: "Taxes", align: "right" },
                      { label: "Insurance", align: "right" },
                      { label: "HOA", align: "right" },
                      { label: "PMI", align: "right" },
                      { label: "Extra", align: "right" },
                      { label: "Balance", align: "right" },
                    ].map((col) => (
                      <th
                        key={col.label}
                        scope="col"
                        className={`px-2 py-2.5 font-semibold text-foreground sm:px-4 sm:py-3 ${
                          col.align === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeResults.schedule.map((row) => (
                    <tr
                      key={row.month}
                      className="border-b border-gray-100 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-2 py-2 tabular-nums text-foreground sm:px-4 sm:py-3">
                        {row.month}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.payment)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.principal)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.interest)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.taxes)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.insurance)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.hoa)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.pmi)}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right text-primary sm:px-4 sm:py-3">
                        {row.extraPrincipal > 0 ? formatCurrencyPrecise(row.extraPrincipal) : "—"}
                      </td>
                      <td className="px-2 py-2 tabular-nums text-right font-medium text-foreground sm:px-4 sm:py-3">
                        {formatCurrencyPrecise(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
          * This calculator provides estimates only. Actual mortgage payment,
          taxes, insurance, PMI, rates, fees, and loan terms may vary. Contact a
          licensed loan officer for a personalized quote.
        </p>
      </div>
    </div>
  );
}

export default MortgageCalculator;