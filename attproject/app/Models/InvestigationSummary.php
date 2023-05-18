<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvestigationSummary extends Model
{
    use HasFactory;
    protected $table = "investigate_summary";
    protected $fillable = ["invest_snap_id",
                            "invest_level",
                            "invest_version",
                            "scan_year",
                            "scan_month",
                            "business_unit",
                            "scan_domain",
                            "title",
                            "start_count",
                            "approved_count",
                            "functional_count",
                            "microsite_count",
                            "remove_count",
                            "request_count",
                            "investigate_count"];

}
