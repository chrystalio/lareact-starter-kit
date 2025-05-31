import type { Role } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const role = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('Edit', role.id)}>
            Edit
            </DropdownMenuItem>
            <DropdownMenuItem
            onClick={() => console.log('Delete', role.id)}
            className="text-red-500"
                >
                Delete
                </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
        )
        },
    },
]
