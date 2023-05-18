<?php

namespace Database\Seeders;

use App\Models\InvestigationSummary;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            $idata = [
            [
                'id'=>528,
                'invest_level' =>4,
                'invest_version'=>1,
                "scan_year"=>2023,
                "scan_month"=>4,
                "business_unit"=>"Consumer",
                "scan_domain"=>"att.com",
                "title"=>"6-Total Fields (Avg)",
                "start_count"=>85233919,
                "approved_count"=>85231044,
                "functional_count"=>2433,
                "microsite_count"=>240,
                "remove_count"=>NULL,
                "request_count"=>0,
                "investigate_count"=>200 ,
            ],
        ];
        InvestigationSummary::insert($idata);

        DB::table('tags')->delete();
        $data = [
            [
                'name' => 'Tag 1',
                'accessibility' => 'public',
                'rate' => 2000,
                'rank' => 2000,
                'description' => 'Tag 1 Description',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Tag 2',
                'accessibility' => 'public',
                'rate' => 2000,
                'rank' => 2000,
                'description' => 'Tag 2 Description',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Tag 3',
                'accessibility' => 'public',
                'rate' => 2000,
                'rank' => 2000,
                'description' => 'Tag 3 Description',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];
        Tag::insert($data);

        // Testing Dummy Tags
        Tag::factory(100)->create();
    }
}
