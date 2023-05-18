<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('investigate_summary', function (Blueprint $table) {
            $table->id();
            //$table->integer('invest_snap_id')->default(0);
            $table->integer('invest_level')->default(0);
            $table->integer('invest_version')->default(0);
            $table->integer('investigate_count')->default(0);
            $table->integer('request_count')->default(0);
            $table->integer('remove_count')->nullable();
            $table->integer('microsite_count')->default(0);
            $table->integer('functional_count')->default(0);
            $table->integer('approved_count')->default(0);
            $table->integer('start_count')->default(0);
            $table->integer('scan_month')->default(0);
            $table->integer('scan_year')->default(0);
            $table->string('title');
            $table->string('scan_domain');
            $table->string('business_unit');

            //$table->timestamps();
        });

        

    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('investigate_summary');
   
    }
};




