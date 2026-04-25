const DIMENSION_META = {
  user_harm: {
    label: 'User Harm',
    icon: '⚠',
    description: 'Direct physical, psychological, financial, or social harms to end users',
  },
  misaligned_incentives: {
    label: 'Misaligned Incentives',
    icon: '⚖',
    description: 'Business incentives that diverge from user interests',
  },
  dark_patterns: {
    label: 'Dark Patterns',
    icon: '🕳',
    description: 'Manipulative UX, deceptive flows, or psychological exploitation',
  },
  privacy_risks: {
    label: 'Privacy Risks',
    icon: '🔒',
    description: 'Data collection, surveillance, re-identification, or consent issues',
  },
  fairness_concerns: {
    label: 'Fairness Concerns',
    icon: '⚡',
    description: 'Bias, discrimination, unequal access, or disparate impact',
  },
  unintended_consequences: {
    label: 'Unintended Consequences',
    icon: '♾',
    description: 'Second-order effects, misuse potential, or emergent harms',
  },
}

function scoreColor(score) {
  if (score <= 2) return { text: 'text-emerald-400', bg: 'bg-emerald-400', bar: 'bg-emerald-400', badge: 'bg-emerald-950 text-emerald-300 border-emerald-800', label: 'Low Risk' }
  if (score <= 6) return { text: 'text-amber-400', bg: 'bg-amber-400', bar: 'bg-amber-400', badge: 'bg-amber-950 text-amber-300 border-amber-800', label: 'Moderate Risk' }
  return { text: 'text-red-400', bg: 'bg-red-400', bar: 'bg-red-400', badge: 'bg-red-950 text-red-300 border-red-800', label: 'High Risk' }
}

export default function AuditCard({ dimension, data }) {
  const meta = DIMENSION_META[dimension]
  const colors = scoreColor(data.score)
  const barWidth = `${(data.score / 10) * 100}%`

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{meta.icon}</span>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">{meta.label}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{meta.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className={`text-2xl font-bold tabular-nums ${colors.text}`}>{data.score}<span className="text-base font-normal text-slate-500">/10</span></span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 ${colors.badge}`}>{colors.label}</span>
        </div>
      </div>

      {/* Score bar */}
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
          style={{ width: barWidth }}
        />
      </div>

      {/* Flagged text */}
      {data.flagged_text?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Flagged</p>
          <ul className="flex flex-col gap-1.5">
            {data.flagged_text.map((text, i) => (
              <li key={i} className="text-xs text-slate-300 bg-slate-900/60 border-l-2 border-amber-500 px-3 py-2 rounded-r-md font-mono leading-relaxed">
                "{text}"
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {data.suggestions?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Recommendations</p>
          <ul className="flex flex-col gap-1.5">
            {data.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-300">
                <span className="text-emerald-500 mt-0.5 shrink-0">›</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.score === 0 && (
        <p className="text-xs text-emerald-500 flex items-center gap-1.5">
          <span>✓</span> No significant risks identified in this dimension
        </p>
      )}
    </div>
  )
}
