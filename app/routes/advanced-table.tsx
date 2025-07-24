"use client"

import { useState, useEffect } from "react"
import AdvancedDataTable from "~/components/advanced-data-table"
import { createColumnConfig, type TableData } from "~/lib/table-utils"
import type { SortingState } from "@tanstack/react-table"

// Enhanced column configuration with better typing
const columnConfig = createColumnConfig<TableData>([
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: false,
    enableFiltering: false,
  },
  {
    accessorKey: "name",
    header: "Full Name",
    enableSorting: true,
    enableHiding: true,
    enableFiltering: true,
  },
  {
    accessorKey: "email",
    header: "Email Address",
    enableSorting: true,
    enableHiding: true,
    enableFiltering: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
    enableHiding: true,
    enableFiltering: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    enableHiding: true,
    enableFiltering: true,
    cell: ({ row }) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.getValue("status") === "Active"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
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
    enableFiltering: true,
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
    enableFiltering: true,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("salary"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium text-right">{formatted}</div>
    },
  },
])

export default function AdvancedTablePage() {
  const [data, setData] = useState<TableData[]>([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [sorting, setSorting] = useState<SortingState>([])

  // Fetch data function
  const fetchData = async () => {
    setLoading(true)
    try {
      // For demo purposes, we'll use mock data
      // Replace this with actual API call using fetchTableData
      const mockData: TableData[] = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
          createdAt: "2024-01-15",
          salary: 75000,
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "User",
          status: "Inactive",
          createdAt: "2024-01-20",
          salary: 65000,
        },
        // Add more mock data as needed
      ]

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setData(mockData)
      setTotalCount(mockData.length)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [currentPage, pageSize, filters, sorting])

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters)
    setCurrentPage(0) // Reset to first page when filtering
  }

  const handlePaginationChange = (pageIndex: number, newPageSize: number) => {
    setCurrentPage(pageIndex)
    setPageSize(newPageSize)
  }

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
  }

  return (
    <div className="p-10">
      <AdvancedDataTable
        data={data}
        columnConfig={columnConfig}
        onFilterChange={handleFilterChange}
        loading={loading}
        totalCount={totalCount}
        serverSide={true}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
      />
    </div>
  )
}
