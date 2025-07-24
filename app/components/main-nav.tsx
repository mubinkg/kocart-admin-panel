import { ChevronDown } from "lucide-react"
import { Button } from "~/components/ui/button"

export default function MainNav() {
  return (
    <div className="flex items-center justify-between border-b border-[#1e1e20] bg-[#101012] px-4 py-2">
      <div className="flex space-x-6">
        <NavItem label="Company & Culture" hasDropdown />
        <NavItem label="Supply" hasDropdown />
        <NavItem label="Opportunities" hasDropdown active />
        <NavItem label="Portfolio" hasDropdown />
        <NavItem label="Technicalities" hasDropdown />
        <NavItem label="Estimate & Test" />
      </div>

      <div className="flex space-x-4">
        <Button variant="ghost" className="text-enterprise-orange hover:text-enterprise-orange/90">
          Order an Assessment
        </Button>
        <Button variant="ghost" className="text-enterprise-blue hover:text-enterprise-blue/90">
          Insights & Content
        </Button>
        <Button variant="ghost" className="text-enterprise-yellow hover:text-enterprise-yellow/90">
          Book a meeting
        </Button>
      </div>
    </div>
  )
}

function NavItem({ label, hasDropdown = false, active = false }) {
  return (
    <div
      className={`flex cursor-pointer items-center space-x-1 ${active ? "text-white" : "text-gray-400"} hover:text-white`}
    >
      <span>{label}</span>
      {hasDropdown && <ChevronDown className="h-4 w-4" />}
    </div>
  )
}
