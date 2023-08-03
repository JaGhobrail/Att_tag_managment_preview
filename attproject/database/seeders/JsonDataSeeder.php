<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Seeder;
use App\Models\AdTech\VendorList;
use App\Models\AdTech\TrackerList;
use App\Models\AdTech\PageSectList;
use App\Models\AdTech\PageUrlList;
use App\Models\AdTech\BusinessUnit;
use App\Models\User;

class JsonDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('seeders/data.json'));
        $data = json_decode($json, true);

        $users = $data["users"];
        $units = $data["business_unit"];
        $vendors = $data["vendors"];
        $trackers = $data["trackers"];
        $pageSctions = $data["pagesecttions"];
        $pageUrlList = $data["pageurls"];
        $tmcrDomains = $data["tmcr_domains"];
        $tmcrPages = $data["tmcr_pages"];

        // foreach ($users as &$item) {
        //         $item['password'] = Hash::make("12345678");
        // }

        foreach ($vendors as $item) {
            VendorList::create($item);
        }
        foreach ($trackers as $item) {
            TrackerList::create($item);
        }
        foreach ($pageSctions as $item) {
            PageSectList::create($item);
        }
        foreach ($pageUrlList as $item) {
            PageUrlList::create($item);
        }
        // foreach ($users as $item) {
        //     $user = new User();
        //     $user->name = $item['name'];
        //     $user->email = $item['email'];
        //     $user->color = $item['color'];
        //     $user->password = Hash::make($item['password']);
        //     $user->save();
        //     // User::create($item);
        // }
        foreach ($units as $item) {

            BusinessUnit::create($item);
        }
    }
}
