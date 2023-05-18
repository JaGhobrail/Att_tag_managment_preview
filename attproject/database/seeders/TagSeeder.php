<?php

namespace Database\Seeders;

use App\Models\InvestigationSummary;
use App\Models\PageUrlList;
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
        $idata1 = [
            [
                'ver'=>2,
                'as_of_date' =>'2018-03-12',
                'num_scans'=>3,
                'business_unit'=>'ggggg',
                'scan_domain'=>'hhhh',
                'scan_year'=>1999,
                'scan_month'=>12,
                'vendor_parent'=>'att',
                'vendor_name'=>'att',
                'tracker_name'=>'att',
                'tracker_domain'=>'att',
                'page_section'=>'ffphp artisan migrate',
                'result'=>'f',
                'notes'=>'f',
                'tracker_category'=>'f',
                'tracker_url'=>'f',
                'tracker_query'=>'df',
                'page_url'=>'f',
                'scan_date'=>'2018-12-03',
                'tot_tags'=>2,
                'tot_scripts'=>3,
                'tot_beacons'=>1,
                'tot_others'=>2,
                'tot_cookies'=>3,
                'tot_pages'=>4
            ],
        ];
        PageUrlList::insert($idata1);
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
