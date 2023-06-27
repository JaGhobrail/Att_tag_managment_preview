<?php

namespace App\Models\AdTech;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageUrlList extends Model
{
    use HasFactory;
    protected $table = "page_url_lists";
    protected $guarded = [];
    // protected $fillable = ["as_of_date,
    // ver,
    // num_scans,
    // business_unit,
    // scan_domain,
    // scan_year,
    // scan_month,
    // vendor_parent,
    // vendor_name,
    // tracker_name,
    // tracker_domain,
    // page_section,
    // result,
    // notes,
    // tracker_category,
    // tracker_url,
    // tracker_query,
    // page_url,
    // scan_date,
    // tot_tags,
    // tot_scripts,
    // tot_beacons,
    // tot_others,
    // tot_cookies,
    // tot_pages"];
}
