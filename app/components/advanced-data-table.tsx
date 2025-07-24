import { useState, useEffect, useMemo, useCallback } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import {
  ChevronDown,
  Download,
  Eye,
  Filter,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  RefreshCw,
} from "lucide-react"

interface AdvancedDataTableProps<TData> {
  data: TData[]
  columnConfig: any[]
  onFilterChange?: (filters: Record<string, string>) => void
  loading?: boolean
  totalCount?: number
  serverSide?: boolean
  onPaginationChange?: (pageIndex: number, pageSize: number) => void
  onSortingChange?: (sorting: SortingState) => void
}

export default function AdvancedDataTable<TData>({
  data,
  columnConfig,
  onFilterChange,
  loading = false,
  totalCount,
  serverSide = false,
  onPaginationChange,
  onSortingChange,
}: AdvancedDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [filters, setFilters] = useState<Record<string, string>>({})

  // Create columns from config
  const columns = useMemo<ColumnDef<TData>[]>(() => {
    return columnConfig.map((config) => ({
      ...config,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              const newSorting = column.getIsSorted() === "asc" ? "desc" : "asc"
              column.toggleSorting(column.getIsSorted() === "asc")

              if (serverSide && onSortingChange) {
                onSortingChange([{ id: column.id, desc: newSorting === "desc" }])
              }
            }}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            {config.header}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    }))
  }, [columnConfig, serverSide, onSortingChange])

  // Debounced filter function
  const debouncedFilterChange = useCallback(
    debounce((newFilters: Record<string, string>) => {
      if (onFilterChange) {
        onFilterChange(newFilters)
      }
    }, 500),
    [onFilterChange],
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  })

  // Handle filter changes with debouncing
  const handleFilterChange = (columnId: string, value: string) => {
    const newFilters = { ...filters, [columnId]: value }
    setFilters(newFilters)

    if (!serverSide) {
      table.getColumn(columnId)?.setFilterValue(value)
    } else {
      debouncedFilterChange(newFilters)
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({})
    setGlobalFilter("")
    table.resetColumnFilters()
    table.resetGlobalFilter()
    if (onFilterChange) {
      onFilterChange({})
    }
  }

  // Handle pagination changes
  useEffect(() => {
    if (serverSide && onPaginationChange) {
      const { pageIndex, pageSize } = table.getState().pagination
      onPaginationChange(pageIndex, pageSize)
    }
  }, [table.getState().pagination, serverSide, onPaginationChange])

  // Export to CSV with better formatting
  const exportToCSV = () => {
    const headers = table.getVisibleFlatColumns().map((column) => {
      const config = columnConfig.find((c) => c.accessorKey === column.id)
      return config?.header || column.id
    })

    const rows = table.getFilteredRowModel().rows.map((row) =>
      table.getVisibleFlatColumns().map((column) => {
        const cellValue = row.getValue(column.id)
        // Handle different data types
        if (cellValue === null || cellValue === undefined) return ""
        if (typeof cellValue === "object") return JSON.stringify(cellValue)
        return String(cellValue).replace(/"/g, '""') // Escape quotes
      }),
    )

    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `table-data-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Export to XLSX with better formatting
  const exportToXLSX = async () => {
    try {
      const XLSX = await import("xlsx")

      const headers = table.getVisibleFlatColumns().map((column) => {
        const config = columnConfig.find((c) => c.accessorKey === column.id)
        return config?.header || column.id
      })

      const rows = table.getFilteredRowModel().rows.map((row) =>
        table.getVisibleFlatColumns().reduce(
          (acc, column) => {
            const config = columnConfig.find((c) => c.accessorKey === column.id)
            const header = config?.header || column.id
            const cellValue = row.getValue(column.id)

            if (cellValue === null || cellValue === undefined) {
              acc[header] = ""
            } else if (typeof cellValue === "object") {
              acc[header] = JSON.stringify(cellValue)
            } else {
              acc[header] = cellValue
            }

            return acc
          },
          {} as Record<string, any>,
        ),
      )

      const worksheet = XLSX.utils.json_to_sheet(rows)

      // Auto-size columns
      const colWidths = headers.map((header) => ({
        wch: Math.max(header.length, 15),
      }))
      worksheet["!cols"] = colWidths

      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
      XLSX.writeFile(workbook, `table-data-${new Date().toISOString().split("T")[0]}.xlsx`)
    } catch (error) {
      console.error("Error exporting to XLSX:", error)
    }
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (globalFilter ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <Card>
        <CardContent className="space-y-4">
          {/* Global Search */}
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(event) => {
                const value = event.target.value
                setGlobalFilter(value)
                if (serverSide) {
                  debouncedFilterChange({ ...filters, _global: value })
                }
              }}
              className="max-w-sm"
            />
            {loading && <RefreshCw className="h-4 w-4 animate-spin text-gray-500" />}
          </div>

          <Separator />

          {/* Column-specific filters */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {columnConfig
              .filter((config) => config.accessorKey !== "id" && config.enableFiltering !== false)
              .map((config) => (
                <div key={config.accessorKey} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {config.header}
                    {filters[config.accessorKey] && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        filtered
                      </Badge>
                    )}
                  </label>
                  <div className="relative">
                    <Input
                      placeholder={`Filter by ${config.header.toLowerCase()}...`}
                      value={filters[config.accessorKey] || ""}
                      onChange={(event) => handleFilterChange(config.accessorKey, event.target.value)}
                    />
                    {filters[config.accessorKey] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-6 w-6 p-0"
                        onClick={() => handleFilterChange(config.accessorKey, "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <Separator />

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {/* Column Visibility */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      const config = columnConfig.find((c) => c.accessorKey === column.id)
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {config?.header || column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Export Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem onClick={exportToCSV}>Export as CSV</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem onClick={exportToXLSX}>Export as XLSX</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Results count */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {serverSide
                  ? `${totalCount || 0} total rows`
                  : `${table.getFilteredRowModel().rows.length} of ${table.getCoreRowModel().rows.length} row(s)`}
              </Badge>
              {loading && (
                <Badge variant="outline">
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Loading...
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="font-semibold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </div>
                      ) : (
                        "No results found."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Card>
        <CardContent className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              className="h-8 w-[70px] rounded border border-input bg-background px-2 text-sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }) as T
}
