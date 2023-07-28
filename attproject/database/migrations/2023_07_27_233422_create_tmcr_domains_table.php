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
        Schema::create('tmcr_domains', function (Blueprint $table) {
            $table->id();
            $table->string('tmcr_id')->nullable();
            $table->string('tmcr_name')->nullable();
            $table->string('vendor_name')->nullable();
            $table->string('tmcr_expected')->nullable();
            $table->string('tmcr_state')->nullable();
            $table->date('tmcr_as_of_date')->nullable();
            $table->string('tag_beacon')->nullable();
            $table->string('tag_script')->nullable();
            $table->string('tag_other')->nullable();
            $table->string('tag_cookie')->nullable();
            $table->string('tracker_domain')->nullable();
            $table->string('tracker_root')->nullable();
            $table->string('tmcr_dom_needed')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tmcr_domains');
    }
};
