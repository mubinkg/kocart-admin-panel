import NewsTicker from "./news-ticker"
import TopBar from "./top-bar"
import MainNav from "./main-nav"
import Sidebar from "./sidebar"
import DashboardContent from "./dashboard-content"

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-[#101012] text-white">
      <NewsTicker />
      <TopBar />
      <MainNav />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}
