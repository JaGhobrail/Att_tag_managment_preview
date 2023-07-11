<?php

namespace Database\Seeders;

use App\Enums\UserRolesEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::findByName(UserRolesEnum::SUPER_ADMIN->value);
        // $superAdminUser = User::where(['email' => 'admin@att.com'])->get();
        $superAdminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@att.com',
            'password' => bcrypt('12345678'),
        ]);

        $superAdminUser->assignRole($superAdminRole);
    }
}
