import type React from "react"

// Utility function to create column configurations
export function createColumnConfig<T>(
  config: {
    accessorKey: keyof T
    header: string
    enableSorting?: boolean
    enableHiding?: boolean
    enableFiltering?: boolean
    cell?: (props: any) => React.ReactNode
  }[],
) {
  return config
}

// Utility function for backend API calls
export async function fetchTableData(params: {
  page: number
  pageSize: number
  filters: Record<string, string>
  sorting: Array<{ id: string; desc: boolean }>
}) {
  // Replace with your actual API endpoint
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
    ...params.filters,
  })

  if (params.sorting.length > 0) {
    queryParams.append("sortBy", params.sorting[0].id)
    queryParams.append("sortOrder", params.sorting[0].desc ? "desc" : "asc")
  }

  try {
    const response = await fetch(`/api/table-data?${queryParams}`)
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching table data:", error)
    throw error
  }
}

// Type definitions for better TypeScript support
export interface TableData {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  salary: number
}

export interface TableResponse {
  data: TableData[]
  totalCount: number
  page: number
  pageSize: number
}
