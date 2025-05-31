import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import type { BreadcrumbItem, Role } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ColumnFiltersState } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/roles',
    },
];

export default function Index({ roles }: { roles: Role[] }) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const handleFilterChange = (value: string) => {
        setColumnFilters([{ id: 'name', value }])
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles List" />
            <div className="mx-4 mt-4">
                <Card>
                    <CardContent>
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <Input
                                type="search"
                                placeholder="Filter roles..."
                                value={(columnFilters.find((f) => f.id === 'name')?.value as string) ?? ''}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="w-full sm:w-64"
                            />

                            <Button asChild>
                                <Link href="/admin/roles/create">Create Role</Link>
                            </Button>
                        </div>

                        <DataTable columns={columns} data={roles} columnFilters={columnFilters} onColumnFiltersChange={setColumnFilters} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
