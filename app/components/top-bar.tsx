import { Search, Moon, Settings, Bell, Grid3X3 } from "lucide-react"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"

export default function TopBar() {
  return (
    <div className="flex items-center justify-between bg-[#101012] px-4 py-3">
      <div className="flex items-center">
        <div className="mr-6 flex items-center">
          <div className="relative h-8 w-8">
            <div className="absolute h-8 w-8 rounded-full bg-enterprise-yellow"></div>
            <div className="absolute left-1 top-1 text-xl font-bold text-black">V</div>
          </div>
          <span className="ml-2 text-xl font-bold tracking-wider text-white">ENTERPRISES</span>
        </div>

        <div className="relative w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            className="bg-[#1e1e20] pl-10 text-sm text-gray-300"
            placeholder="I'm a smart assistant robot. I can help you find the information that you need..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Moon className="h-5 w-5 text-yellow-300" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-blue-500 p-0 text-center text-xs">3</Badge>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Grid3X3 className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
