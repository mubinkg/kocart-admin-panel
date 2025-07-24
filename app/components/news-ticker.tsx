import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NewsTicker() {
  return (
    <div className="flex items-center justify-between bg-[#111620] px-4 py-2 text-sm">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-white">Last week news</span>
      </div>
      <div className="flex items-center">
        <span className="text-blue-400">Johnny Panait just released "Latest Social Media Algorithm Changes".</span>
        <Link href="#" className="ml-4 flex items-center text-enterprise-yellow hover:underline">
          Download Now <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div>
        <Link href="#" className="text-enterprise-orange hover:underline">
          Find more <ArrowRight className="ml-1 inline-block h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
