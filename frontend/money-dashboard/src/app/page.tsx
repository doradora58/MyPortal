"use client"

import { useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ArrowLeft, Coins, TrendingUp, Wallet } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { calculateInvestment } from "@/lib/calculations"

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
})

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export default function MoneyDashboard() {
  const [monthlyAmount, setMonthlyAmount] = useState(30_000)
  const [annualRate, setAnnualRate] = useState(5)
  const [years, setYears] = useState(20)

  const forecast = useMemo(
    () => calculateInvestment(monthlyAmount, annualRate, years),
    [monthlyAmount, annualRate, years],
  )
  const finalForecast = forecast.at(-1)
  const totalContribution = monthlyAmount * years * 12
  const estimatedBalance = finalForecast?.total ?? 0
  const estimatedProfit = estimatedBalance - totalContribution

  const adjustAmount = (delta: number) =>
    setMonthlyAmount((value) => clamp(value + delta, 0, 100_000))
  const adjustRate = (delta: number) =>
    setAnnualRate((value) =>
      Number(clamp(value + delta, 0, 15).toFixed(1)),
    )
  const adjustYears = (delta: number) =>
    setYears((value) => clamp(value + delta, 1, 40))

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl space-y-8 bg-[#f3f7ff] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-700"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        MyPortalへ戻る
      </a>

      <section className="space-y-3">
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
          資産形成シミュレーション
        </Badge>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Money Dashboard
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
              毎月の積立額・想定利回り・期間から、将来の資産推移を試算します。
            </p>
          </div>
          <p className="text-xs leading-5 text-slate-600">
            入力した値はブラウザー内で計算され、保存・送信されません。
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
        <Card className="h-fit border-blue-100 bg-white shadow-sm shadow-blue-950/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="size-5 text-blue-700" aria-hidden="true" />
              シミュレーション条件
            </CardTitle>
            <CardDescription className="leading-5 text-slate-600">
              スライダーまたは +/- ボタンで調整できます。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label>毎月の積立額</Label>
                <span className="font-semibold tabular-nums text-blue-800">
                  {yen.format(monthlyAmount)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="毎月の積立額を1,000円減らす"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40"
                  disabled={monthlyAmount === 0}
                  onClick={() => adjustAmount(-1_000)}
                >
                  -
                </button>
                <Slider
                  aria-label="毎月の積立額"
                  value={[monthlyAmount]}
                  max={100_000}
                  step={1_000}
                  onValueChange={(value) => setMonthlyAmount(value[0])}
                  className="flex-1 [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-blue-600 [&_[data-slot=slider-thumb]]:ring-blue-200"
                />
                <button
                  type="button"
                  aria-label="毎月の積立額を1,000円増やす"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40"
                  disabled={monthlyAmount === 100_000}
                  onClick={() => adjustAmount(1_000)}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>0円</span>
                <span>100,000円</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label>想定利回り（年率）</Label>
                <span className="font-semibold tabular-nums text-blue-800">{annualRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="想定利回りを0.1%下げる"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40"
                  disabled={annualRate === 0}
                  onClick={() => adjustRate(-0.1)}
                >
                  -
                </button>
                <Slider
                  aria-label="想定利回り"
                  value={[annualRate]}
                  max={15}
                  step={0.1}
                  onValueChange={(value) => setAnnualRate(value[0])}
                  className="flex-1 [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-blue-600 [&_[data-slot=slider-thumb]]:ring-blue-200"
                />
                <button
                  type="button"
                  aria-label="想定利回りを0.1%上げる"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40"
                  disabled={annualRate === 15}
                  onClick={() => adjustRate(0.1)}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>0%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Label>積立期間</Label>
                <span className="font-semibold tabular-nums text-blue-800">{years}年</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="積立期間を1年短くする"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40"
                  disabled={years === 1}
                  onClick={() => adjustYears(-1)}
                >
                  -
                </button>
                <Slider
                  aria-label="積立期間"
                  min={1}
                  value={[years]}
                  max={40}
                  step={1}
                  onValueChange={(value) => setYears(value[0])}
                  className="flex-1 [&_[data-slot=slider-range]]:bg-blue-600 [&_[data-slot=slider-thumb]]:border-blue-600 [&_[data-slot=slider-thumb]]:ring-blue-200"
                />
                <button
                  type="button"
                  aria-label="積立期間を1年延ばす"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-lg transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-40"
                  disabled={years === 40}
                  onClick={() => adjustYears(1)}
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>1年</span>
                <span>40年</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="min-w-0 space-y-6" aria-label="資産シミュレーション結果">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-blue-700 bg-blue-700 text-white shadow-md shadow-blue-900/15">
              <CardContent className="space-y-2 pt-5">
                <p className="text-sm font-medium text-blue-100">予想資産額</p>
                <p className="text-2xl font-bold tabular-nums sm:text-3xl">
                  {yen.format(estimatedBalance)}
                </p>
                <p className="text-xs text-blue-100">{years}年後の試算</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 bg-white shadow-sm shadow-blue-950/5">
              <CardContent className="space-y-2 pt-5">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Coins className="size-4" aria-hidden="true" />
                  積立元本
                </p>
                <p className="text-xl font-bold tabular-nums text-slate-950 sm:text-2xl">
                  {yen.format(totalContribution)}
                </p>
                <p className="text-xs leading-5 text-slate-600">
                  {yen.format(monthlyAmount)} × 12か月 × {years}年
                </p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 bg-white shadow-sm shadow-blue-950/5">
              <CardContent className="space-y-2 pt-5">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <TrendingUp className="size-4" aria-hidden="true" />
                  運用収益（試算）
                </p>
                <p className="text-xl font-bold tabular-nums text-blue-700 sm:text-2xl">
                  {yen.format(estimatedProfit)}
                </p>
                <p className="text-xs leading-5 text-slate-600">予想資産額 − 積立元本</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-blue-100 bg-white shadow-sm shadow-blue-950/5">
            <CardHeader>
              <CardTitle>資産推移の試算</CardTitle>
              <CardDescription className="leading-5 text-slate-600">
                元本と運用収益の内訳を年ごとに表示します。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px] w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  initialDimension={{ width: 800, height: 320 }}
                >
                  <BarChart
                    data={forecast}
                    margin={{ top: 8, right: 8, bottom: 4, left: 8 }}
                  >
                    <CartesianGrid stroke="#dbeafe" strokeDasharray="4 4" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickFormatter={(value: number) => `${value}年`}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(value: number) =>
                        value >= 100_000_000
                          ? `${(value / 100_000_000).toFixed(1)}億`
                          : `${Math.round(value / 10_000)}万`
                      }
                      tickLine={false}
                      axisLine={false}
                      width={52}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) =>
                        `${Number(value ?? 0).toLocaleString("ja-JP")}円`
                      }
                      labelFormatter={(value) => `${value}年目`}
                      contentStyle={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 12,
                        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                      }}
                    />
                    <Legend iconType="circle" />
                    <Bar
                      dataKey="principal"
                      name="積立元本"
                      stackId="assets"
                      fill="#93c5fd"
                    />
                    <Bar
                      dataKey="profit"
                      name="運用収益"
                      stackId="assets"
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-xs leading-5 text-slate-700">
                毎月の積立分を月初に投資し、想定利回りを月次換算して複利運用する前提の概算です。税金・手数料・価格変動は考慮していません。
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
