import { useEffect, useState } from 'react'
import { usageStore } from './store.js'
import { D3PieChart, D3LineChart } from './charts.js'
import type { UsageRecord } from '../tracking/types.js'
import type { SessionData } from '../tracking/types.js'

export function CostByProvider() {
  const records = usageStore((s: { records: UsageRecord[] }) => s.records)
  const loadData = usageStore((s: { loadData: () => void }) => s.loadData)
  const getProviderTotals = usageStore((s: { getProviderTotals: () => Record<string, { cost: number; tokens: number }> }) => s.getProviderTotals)

  useEffect(() => {
    loadData()
  }, [loadData])

  const totals = getProviderTotals()
  const data = Object.fromEntries(
    Object.entries(totals).map(([provider, { cost }]) => [provider, cost])
  )

  if (records.length === 0) {
    return <div className="text-gray-500 p-4">No usage data yet. Call trackUsage() to start tracking.</div>
  }

  return <D3PieChart data={data} title="Cost by Provider" />
}

export function UsageOverTime() {
  const records = usageStore((s: { records: UsageRecord[] }) => s.records)
  const loadData = usageStore((s: { loadData: () => void }) => s.loadData)

  useEffect(() => {
    loadData()
  }, [loadData])

  if (records.length === 0) {
    return <div className="text-gray-500 p-4">No usage data yet. Call trackUsage() to start tracking.</div>
  }

  return <D3LineChart records={records} title="Usage Over Time" />
}

export function SessionSummary() {
  const records = usageStore((s: { records: UsageRecord[] }) => s.records)
  const loadData = usageStore((s: { loadData: () => void }) => s.loadData)
  const getSessions = usageStore((s: { getSessions: (hours: number) => SessionData[] }) => s.getSessions)

  useEffect(() => {
    loadData()
  }, [loadData])

  const sessions = getSessions(2) // 2-hour window

  if (records.length === 0) {
    return <div className="text-gray-500 p-4">No usage data yet. Call trackUsage() to start tracking.</div>
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Session Summary (2-hour windows)</h3>
      <div className="space-y-4">
        {sessions.map((session: SessionData, i: number) => (
          <div key={i} className="border p-3 rounded">
            <div className="text-sm text-gray-600">
              {session.sessionStart} → {session.sessionEnd}
            </div>
            <div className="font-semibold">Cost: ${session.totalCost.toFixed(4)}</div>
            <div className="text-sm">Tokens: {session.totalTokens}</div>
            <div className="text-xs text-gray-500">Requests: {session.records.length}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RequestLogTable() {
  const records = usageStore((s: { records: UsageRecord[] }) => s.records)
  const loadData = usageStore((s: { loadData: () => void }) => s.loadData)
  const [sortField, setSortField] = useState<keyof UsageRecord>('timestamp')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [filterProvider, setFilterProvider] = useState('')
  const [filterModel, setFilterModel] = useState('')

  useEffect(() => {
    loadData()
  }, [loadData])

  const sorted = [...records].sort((a: UsageRecord, b: UsageRecord) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    const dir = sortDir === 'asc' ? 1 : -1
    return aVal < bVal ? -1 * dir : aVal > bVal ? 1 * dir : 0
  })

  const filtered = sorted.filter((r: UsageRecord) => {
    if (filterProvider && !r.provider.toLowerCase().includes(filterProvider.toLowerCase())) return false
    if (filterModel && !r.model.toLowerCase().includes(filterModel.toLowerCase())) return false
    return true
  })

  if (records.length === 0) {
    return <div className="text-gray-500 p-4">No usage data yet. Call trackUsage() to start tracking.</div>
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Request Log</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by provider..."
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
          className="border p-1 rounded"
        />
        <input
          type="text"
          placeholder="Filter by model..."
          value={filterModel}
          onChange={(e) => setFilterModel(e.target.value)}
          className="border p-1 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 cursor-pointer" onClick={() => { setSortField('timestamp'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }}>Timestamp</th>
              <th className="text-left p-2">Provider</th>
              <th className="text-left p-2">Model</th>
              <th className="text-right p-2">Input Tokens</th>
              <th className="text-right p-2">Output Tokens</th>
              <th className="text-right p-2">Cost</th>
              <th className="text-left p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r: UsageRecord) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{new Date(r.timestamp).toLocaleString()}</td>
                <td className="p-2">{r.provider}</td>
                <td className="p-2">{r.model}</td>
                <td className="p-2 text-right">{r.inputTokens}</td>
                <td className="p-2 text-right">{r.outputTokens}</td>
                <td className="p-2 text-right">${r.cost.toFixed(4)}</td>
                <td className="p-2">{r.requestType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function BudgetTracker() {
  const records = usageStore((s: { records: UsageRecord[] }) => s.records)
  const loadData = usageStore((s: { loadData: () => void }) => s.loadData)
  const getProviderTotals = usageStore((s: { getProviderTotals: () => Record<string, { cost: number; tokens: number }> }) => s.getProviderTotals)

  useEffect(() => {
    loadData()
  }, [loadData])

  const totals = getProviderTotals()

  if (records.length === 0) {
    return <div className="text-gray-500 p-4">No usage data yet. Call trackUsage() to start tracking.</div>
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Budget Tracking</h3>
      <div className="space-y-2">
        {Object.entries(totals).map(([provider, { cost, tokens }]) => (
          <div key={provider} className="border p-3 rounded">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{provider}</span>
              <span className="text-sm">${cost.toFixed(4)}</span>
            </div>
            <div className="text-xs text-gray-600">Tokens: {tokens}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Dashboard() {
  const [pollInterval, ] = useState(30000) // 30 seconds default
  const loadData = usageStore((s: { loadData: () => void }) => s.loadData)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, pollInterval)
    return () => clearInterval(interval)
  }, [loadData, pollInterval])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="md:col-span-2">
        <UsageOverTime />
      </div>
      <CostByProvider />
      <SessionSummary />
      <div className="md:col-span-2">
        <RequestLogTable />
      </div>
      <div className="md:col-span-2">
        <BudgetTracker />
      </div>
    </div>
  )
}
