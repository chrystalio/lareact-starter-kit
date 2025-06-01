import React, { useState } from 'react';
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ColumnFiltersState } from '@tanstack/react-table';
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import type { BreadcrumbItem, Role } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDialog } from '@/components/ui/form-dialog';
import { toast } from "sonner"
import { router } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/roles',
    },
];

export default function Index({ roles }: { roles: Role[] }) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { props } = usePage<{ success?: string }>();

    useEffect(() => {
        if (props.success) {
            toast.success("Success", {
                description: props.success,
            });
        }
    }, [props.success]);

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

                            <FormDialog
                                title="Create Role"
                                triggerText="Create Role"
                                isLoading={isSubmitting}
                                isOpen={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsSubmitting(true);
                                    const formData = new FormData(e.currentTarget);
                                    const name = formData.get('name') as string;

                                    router.post('/admin/roles', { name }, {
                                        onSuccess: () => {
                                            toast.success("Role created", {
                                                description: "A new role has been added.",
                                            })
                                            setIsDialogOpen(false);
                                        },
                                        onError: (errors) => {
                                            toast.error("Failed to create role", {
                                                description: errors.name ?? "There was an error creating the role.",
                                            });
                                        },
                                        onFinish: () => setIsSubmitting(false),
                                    });
                                }}
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input name="name" id="name" placeholder="e.g. Admin" />
                                </div>
                            </FormDialog>
                        </div>

                        <DataTable columns={columns} data={roles} columnFilters={columnFilters} onColumnFiltersChange={setColumnFilters} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
