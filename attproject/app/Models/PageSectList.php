<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageSectList extends Model
{
    use HasFactory;
    protected $table = "page_sect_lists";
    protected $fillable = ["as_of_date,
    ver,
    num_scans,
    business_unit,
    scan_domain,
    scan_year,
    scan_month,
    vendor_parent,
    vendor_name,
    tracker_name,
    tracker_domain,
    page_section,
    result,
    notes,
    tot_tags,
    tot_scripts,
    tot_beacons,
    tot_others,
    tot_cookies,
    tot_pages"];
}
