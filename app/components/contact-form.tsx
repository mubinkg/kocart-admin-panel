import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

export default function ContactForm() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ subject, message })
    // Reset form
    setSubject("")
    setMessage("")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">CONTACT US</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-gray-50 border-gray-100"
        />

        <Textarea
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[160px] bg-gray-50 border-gray-100"
        />

        <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
          Submit
        </Button>
      </form>
    </div>
  )
}
