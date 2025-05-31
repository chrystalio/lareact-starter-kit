import type { Role } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { LucideTrash, MoreHorizontal, PencilIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
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
            <PencilIcon className="h-4 w-4" />
            Edit
            </DropdownMenuItem>
            <DropdownMenuItem
            onClick={() => console.log('Delete', role.id)}
            className="text-red-500"
                >
                <LucideTrash className="h-4 w-4" />
                Delete
                </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
        )
        },
    },
]
