"use client"

import { useState } from "react"
import DataTable from "~/components/data-table"
import { Trash2, FileDown, UserCheck, Mail } from "lucide-react"

// Sample data with more entries for better testing
const generateSampleData = (count: number) => {
  const roles = ["Admin", "User", "Manager", "Editor"]
  const statuses = ["Active", "Inactive"]
  const names = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Wilson",
    "Diana Prince",
    "Clark Kent",
    "Bruce Wayne",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + ` ${Math.floor(i / names.length) + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    createdAt: new Date(2024, 0, 1 + i).toISOString().split("T")[0],
    salary: 50000 + i * 1000,
  }))
}

const sampleData = generateSampleData(50)

// Column configuration
const columnConfig = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Full Name",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email Address",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          row.getValue("status") === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div className="font-mono text-sm">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("salary"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium text-right">{formatted}</div>
    },
  },
]

export default function AdvancedTableExample() {
  const [data, setData] = useState(sampleData)

  // Bulk actions with actual functionality
  const bulkActions = [
    {
      label: "Delete Selected",
      action: (selectedRows) => {
        const selectedIds = selectedRows.map((row) => row.id)
        setData((prevData) => prevData.filter((item) => !selectedIds.includes(item.id)))
        console.log("Deleted rows:", selectedRows)
      },
      variant: "destructive" as const,
      icon: <Trash2 className="mr-2 h-4 w-4" />,
    },
    {
      label: "Export Selected",
      action: (selectedRows) => {
        // Create CSV of selected rows
        const headers = Object.keys(selectedRows[0] || {})
        const csvContent = [
          headers.join(","),
          ...selectedRows.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "selected-rows.csv"
        link.click()
        URL.revokeObjectURL(url)
      },
      variant: "default" as const,
      icon: <FileDown className="mr-2 h-4 w-4" />,
    },
    {
      label: "Mark as Active",
      action: (selectedRows) => {
        const selectedIds = selectedRows.map((row) => row.id)
        setData((prevData) =>
          prevData.map((item) => (selectedIds.includes(item.id) ? { ...item, status: "Active" } : item)),
        )
        console.log("Marked as active:", selectedRows)
      },
      variant: "default" as const,
      icon: <UserCheck className="mr-2 h-4 w-4" />,
    },
    {
      label: "Send Email",
      action: (selectedRows) => {
        const emails = selectedRows.map((row) => row.email).join(", ")
        console.log("Sending email to:", emails)
        alert(`Would send email to: ${emails}`)
      },
      variant: "outline" as const,
      icon: <Mail className="mr-2 h-4 w-4" />,
    },
  ]

  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Filters changed:", filters)
    // Here you would typically make an API call to your backend
    // with the new filters
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Advanced Data Table Example</h1>
        <p className="text-gray-600 mt-2">
          Complete example with row selection, bulk actions, filtering, and export functionality.
        </p>
      </div>

      <DataTable
        data={data}
        columnConfig={columnConfig}
        enableRowSelection={true}
        bulkActions={bulkActions}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}
