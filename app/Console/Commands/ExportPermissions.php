<?php

// app/Console/Commands/ExportPermissions.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;

class ExportPermissions extends Command
{
    protected $signature = 'export:permissions';
    protected $description = 'Export all permissions to a JSON file';

    public function handle(): int
    {
        $permissions = Permission::select('name', 'shortname', 'guard_name')->get();

        file_put_contents(
            storage_path('app/permission.json'),
            json_encode($permissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        $this->info('Permissions exported successfully.');
        return 0;
    }
}

