<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Enums\UserRolesEnum;
use Spatie\Permission\Models\Permission;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // foreach (UserRolesEnum::cases() as $key => $value) {
        //     Role::create(['name' => $value]);
        // }

        // Role::truncate();

        $manageUnit = Permission::findByName(PermissionsEnum::MANAGE_UNIT->value);
        $manageUser = Permission::findByName(PermissionsEnum::MANAGE_USER->value);
        $investigate = Permission::findByName(PermissionsEnum::INVESTIGATE->value);


        $superAdminRole = Role::create((['name' => UserRolesEnum::SUPER_ADMIN->value]));
        $superAdminRole->givePermissionTo($manageUnit);
        $superAdminRole->givePermissionTo($manageUser);
        $superAdminRole->givePermissionTo($investigate);

        $unitAdminRole = Role::create((['name' => UserRolesEnum::UNIT_ADMIN->value]));
        $unitAdminRole->givePermissionTo($manageUser);
        $unitAdminRole->givePermissionTo($investigate);

        $investigatorRole = Role::create((['name' => UserRolesEnum::INVESTIGATOR->value]));
        $investigatorRole->givePermissionTo($investigate);
    }
}
