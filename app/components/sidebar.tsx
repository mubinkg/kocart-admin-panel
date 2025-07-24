import { ChevronDown, Search, BarChart2, LayoutGrid, Users, Layers, Sparkles, Briefcase, FileText } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="h-full w-60 border-r border-[#1e1e20] bg-[#101012] py-4">
      <div className="mb-4 px-4">
        <div className="flex items-center justify-between rounded bg-[#1e1e20] px-3 py-2 text-sm">
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">Scope:</span>
            <span className="font-medium">Opportunities</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-1 px-2">
        <SidebarItem label="Solutions" icon={<Briefcase className="h-4 w-4" />} />
        <SidebarItem label="Opportunities" icon={<Search className="h-4 w-4" />} active />
      </div>

      <div className="mt-4 px-4">
        <div className="text-xs font-semibold uppercase text-gray-500">Services Nature</div>
      </div>

      <div className="mt-2 space-y-1 px-2">
        <SidebarItem label="Findings" icon={<Sparkles className="h-4 w-4" />} hasDropdown />
        <SidebarItem label="Structure" icon={<LayoutGrid className="h-4 w-4" />} />
        <SidebarItem label="Management" icon={<Users className="h-4 w-4" />} />
        <SidebarItem label="Systems" icon={<Layers className="h-4 w-4" />} />
      </div>

      <div className="mt-4 px-4">
        <div className="text-xs font-semibold uppercase text-gray-500">Alignment Tools</div>
      </div>

      <div className="mt-2 space-y-1 px-2">
        <SidebarItem label="Scope AI Assistant" icon={<Sparkles className="h-4 w-4" />} />
        <SidebarItem label="Legal AI Assistant" icon={<FileText className="h-4 w-4" />} />
        <SidebarItem label="Procedural AI Assistant" icon={<BarChart2 className="h-4 w-4" />} />
      </div>
    </div>
  )
}

function SidebarItem({ label, icon, hasDropdown = false, active = false }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 ${
        active ? "bg-[#1e1e20] text-white" : "text-gray-400 hover:bg-[#1e1e20] hover:text-white"
      }`}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2 text-sm">{label}</span>
      </div>
      {hasDropdown && <ChevronDown className="h-4 w-4" />}
    </div>
  )
}
