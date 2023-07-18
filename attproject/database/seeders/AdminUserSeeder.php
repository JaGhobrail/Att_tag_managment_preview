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
        $investRole = Role::findByName(UserRolesEnum::INVESTIGATOR->value);
        // $superAdminUser = User::where(['email' => 'admin@att.com'])->get();
        $superAdminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@att.com',
            'password' => bcrypt('12345678'),
            'color' => "#FFC107",
        ]);
        $user1 = User::create([
            'name' => 'User1',
            'email' => 'user1@att.com',
            'password' => bcrypt('12345678'),
            'color' => "#E91E63",
        ]);
        $user2 = User::create([
            'name' => 'User2',
            'email' => 'user2@att.com',
            'password' => bcrypt('12345678'),
            'color' => "#2196F3",
        ]);
        $user1->assignRole($investRole);
        $user2->assignRole($investRole);
        $superAdminUser->assignRole($superAdminRole);
    }
}
