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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('rate', 8, 2);
            $table->integer('rank')->default(0);
            $table->string('accessibility')->default('public');
            $table->timestamps();
        });

        Schema::create('tag_validations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('rules');
            $table->timestamps();
        });

        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('customer_tag', function (Blueprint $table) {
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('provider_tag', function (Blueprint $table) {
            $table->foreignId('provider_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('provider_tag');
        Schema::dropIfExists('customer_tag');
        Schema::dropIfExists('providers');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('tag_validations');
        Schema::dropIfExists('tags');
    }
};




