<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('page_sect_lists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('as_of_date');
            $table->integer('ver')->default(0);
            $table->integer('num_scans')->default(0);
            $table->string('business_unit');
            $table->string('scan_domain');
            $table->integer('scan_year')->index('idx_ri1p_scan_year')->default(0);
            $table->integer('scan_month')->index('idx_ri1p_scan_month')->default(0);
            $table->string('vendor_parent');
            $table->string('vendor_name')->index('idx_ri1p_vendor_name');
            $table->string('tracker_name');
            $table->string('tracker_domain')->index('idx_ri1p_tracker_domain');
            $table->string('page_section')->index('idx_ri1p_page_section');
            $table->string('result');
            $table->string('notes');
            $table->integer('tot_tags')->default(0);
            $table->integer('tot_scripts')->default(0);
            $table->integer('tot_beacons')->default(0);
            $table->integer('tot_others')->default(0);
            $table->integer('tot_cookies')->default(0);
            $table->integer('tot_pages')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_sect_lists');
    }
};
