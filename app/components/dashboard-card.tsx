interface DashboardCardProps {
  title: string
  highlighted?: boolean
}

export default function DashboardCard({ title, highlighted = false }: DashboardCardProps) {
  return (
    <div
      className={`rounded-md p-4 ${
        highlighted ? "bg-enterprise-blue text-white" : "bg-[#1e1e20] text-white hover:bg-[#2b2b2d]"
      }`}
    >
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-sm opacity-80">
        Browse your domain list, track importance info, and tweak primary settings in seconds.
      </p>
    </div>
  )
}
