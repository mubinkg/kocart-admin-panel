import DashboardCard from "./dashboard-card"

export default function DashboardContent() {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <DashboardCard title="Audits" />
      <DashboardCard title="Assessments" />
      <DashboardCard title="Analyses" />
      <DashboardCard title="Reports" highlighted />
      <DashboardCard title="Researches" />
      <DashboardCard title="Presentations" />
    </div>
  )
}
