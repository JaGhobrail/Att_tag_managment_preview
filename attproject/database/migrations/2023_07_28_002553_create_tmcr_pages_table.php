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
        Schema::create('tmcr_pages', function (Blueprint $table) {
            $table->id();
            $table->string('tmcr_id')->nullable();
            $table->string('tmcr_name')->nullable();
            $table->string('vendor_name')->nullable();
            $table->string('tmcr_expected')->nullable();
            $table->string('tmcr_state')->nullable();
            $table->date('tmcr_as_of_date')->nullable();
            $table->string('business_unit')->nullable();
            $table->string('scan_domain')->nullable();
            $table->string('page_root')->nullable();
            $table->string('page_domain')->nullable();
            $table->text('page_section')->nullable();
            $table->text('page_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tmcr_pages');
    }
};
