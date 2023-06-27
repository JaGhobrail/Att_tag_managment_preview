<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Seeder;
use App\Models\AdTech\VendorList;
use App\Models\AdTech\TrackerList;
use App\Models\AdTech\PageSectList;
use App\Models\AdTech\PageUrlList;

class JsonDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('seeders/data.json'));
        $data = json_decode($json, true);
        $vendors = $data["vendors"];
        $trackers = $data["trackers"];
        $pageSctions = $data["pagesecttions"];
        $pageUrlList = $data["pageurls"];
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
    }
}
