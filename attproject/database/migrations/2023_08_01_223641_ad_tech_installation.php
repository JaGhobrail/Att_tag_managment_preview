<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * users
         */
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('color')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        /**
         * password_reset_tokens
         */
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        /**
         * password_resets
         */
        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        /**
         * failed_jobs
         */
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });

        /**
         * personal_access_tokens
         */
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        /**
         * investigate_summary
         */
        Schema::create('investigate_summary', function (Blueprint $table) {
            $table->id();
            // $table->integer('invest_snap_id')->default(0);
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
            $table->timestamps();
        });

        /**
         * page_url_lists
         */  Schema::create('page_url_lists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('as_of_date')->nullable();
            $table->integer('ver')->default(0);
            $table->integer('num_scans')->default(0);
            $table->string('business_unit')->nullable();
            $table->string('scan_domain')->nullable();
            $table->integer('scan_year')->index('idx_ri1u_scan_year')->default(0);
            $table->integer('scan_month')->index('idx_ri1u_scan_month')->default(0);
            $table->string('vendor_parent')->nullable();
            $table->string('vendor_name')->index('idx_ri1u_vendor_name');
            $table->string('tracker_name')->nullable();
            $table->string('tracker_domain')->index('idx_ri1u_tracker_domain');
            $table->string('page_section')->index('idx_ri1u_page_section');
            $table->string('result')->nullable();
            $table->text('notes')->nullable();
            $table->string('tracker_category')->nullable();
            $table->text('tracker_url')->nullable();
            $table->text('tracker_query')->nullable();
            $table->text('page_url')->nullable();
            $table->date('scan_date')->nullable();
            $table->integer('tot_tags')->default(0);
            $table->integer('tot_scripts')->default(0);
            $table->integer('tot_beacons')->default(0);
            $table->integer('tot_others')->default(0);
            $table->integer('tot_cookies')->default(0);
            $table->integer('tot_pages')->default(0);
        });

        /**
         * page_sect_lists
         */
        Schema::create('page_sect_lists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('as_of_date')->nullable();
            $table->integer('ver')->default(0);
            $table->integer('num_scans')->default(0);
            $table->string('business_unit')->nullable();
            $table->string('scan_domain')->nullable();
            $table->integer('scan_year')->index('idx_ri1p_scan_year')->default(0);
            $table->integer('scan_month')->index('idx_ri1p_scan_month')->default(0);
            $table->string('vendor_parent')->nullable();
            $table->string('vendor_name')->index('idx_ri1p_vendor_name');
            $table->string('tracker_name')->nullable();
            $table->string('tracker_domain')->index('idx_ri1p_tracker_domain');
            $table->string('page_section')->index('idx_ri1p_page_section');
            $table->string('result')->nullable();
            $table->text('notes')->nullable();
            $table->integer('tot_tags')->default(0);
            $table->integer('tot_scripts')->default(0);
            $table->integer('tot_beacons')->default(0);
            $table->integer('tot_others')->default(0);
            $table->integer('tot_cookies')->default(0);
            $table->integer('tot_pages')->default(0);
        });

        /**
         * tracker_lists
         */ Schema::create('tracker_lists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('as_of_date')->nullable();;
            $table->integer('ver')->default(0);
            $table->integer('num_scans')->default(0);
            $table->string('business_unit')->nullable();;
            $table->string('scan_domain')->nullable();;
            $table->integer('scan_year')->index('idx_ri1t_scan_year')->default(0);
            $table->integer('scan_month')->index('idx_ri1t_scan_month')->default(0);
            $table->string('vendor_parent')->nullable();;
            $table->string('vendor_name')->index('idx_ri1t_vendor_name');
            $table->string('tracker_name')->nullable();;
            $table->string('tracker_domain')->index('idx_ri1t_tracker_domain');
            $table->string('result')->nullable();;
            $table->text('notes')->nullable();;
            $table->integer('tot_tags')->default(0);
            $table->integer('tot_scripts')->default(0);
            $table->integer('tot_beacons')->default(0);
            $table->integer('tot_others')->default(0);
            $table->integer('tot_cookies')->default(0);
            $table->integer('tot_pages')->default(0);
        });

        /**
         * vendor_lists
         */
        Schema::create('vendor_lists', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('as_of_date')->nullable();
            $table->integer('ver')->default(0);
            $table->integer('num_scans')->default(0);
            $table->string('business_unit')->nullable();
            $table->string('scan_domain')->nullable();
            $table->integer('scan_year')->index('idx_ri1v_scan_year')->default(0);
            $table->integer('scan_month')->index('idx_ri1v_scan_month')->default(0);
            $table->string('vendor_parent')->nullable();
            $table->string('vendor_name')->index('idx_ri1v_vendor_name');
            $table->string('result')->nullable();
            $table->text('notes')->nullable();
            $table->integer('tot_tags')->default(0);
            $table->integer('tot_scripts')->default(0);
            $table->integer('tot_beacons')->default(0);
            $table->integer('tot_others')->default(0);
            $table->integer('tot_cookies')->default(0);
            $table->integer('tot_pages')->default(0);
        });

        /**
         * notes
         */
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->longText('body');
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('domain')->nullable();
            $table->morphs('noteable');
            $table->timestamps();
        });



        /**
         * drafts
         */
        Schema::create('drafts', function (Blueprint $table) {
            $table->id();
            $table->json('body');
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->morphs('draftable');
            $table->timestamps();
        });

        /**
         * business_units
         */
        Schema::create('business_units', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // $table->string('url');
            $table->timestamps();
        });


        /**
         * permission
         */
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        $teams = config('permission.teams');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }
        if ($teams && empty($columnNames['team_foreign_key'] ?? null)) {
            throw new \Exception('Error: team_foreign_key on config/permission.php not loaded. Run [php artisan config:clear] and try again.');
        }

        Schema::create($tableNames['permissions'], function (Blueprint $table) {
            $table->bigIncrements('id'); // permission id
            $table->string('name');       // For MySQL 8.0 use string('name', 125);
            $table->string('guard_name'); // For MySQL 8.0 use string('guard_name', 125);
            $table->timestamps();

            $table->unique(['name', 'guard_name']);
        });

        Schema::create($tableNames['roles'], function (Blueprint $table) use ($teams, $columnNames) {
            $table->bigIncrements('id'); // role id
            if ($teams || config('permission.testing')) { // permission.testing is a fix for sqlite testing
                $table->unsignedBigInteger($columnNames['team_foreign_key'])->nullable();
                $table->index($columnNames['team_foreign_key'], 'roles_team_foreign_key_index');
            }
            $table->string('name');       // For MySQL 8.0 use string('name', 125);
            $table->string('guard_name'); // For MySQL 8.0 use string('guard_name', 125);
            $table->timestamps();
            if ($teams || config('permission.testing')) {
                $table->unique([$columnNames['team_foreign_key'], 'name', 'guard_name']);
            } else {
                $table->unique(['name', 'guard_name']);
            }
        });

        Schema::create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
            $table->unsignedBigInteger(PermissionRegistrar::$pivotPermission);

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_permissions_model_id_model_type_index');

            $table->foreign(PermissionRegistrar::$pivotPermission)
                ->references('id') // permission id
                ->on($tableNames['permissions'])
                ->onDelete('cascade');
            if ($teams) {
                $table->unsignedBigInteger($columnNames['team_foreign_key']);
                $table->index($columnNames['team_foreign_key'], 'model_has_permissions_team_foreign_key_index');

                $table->primary(
                    [$columnNames['team_foreign_key'], PermissionRegistrar::$pivotPermission, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_permissions_permission_model_type_primary'
                );
            } else {
                $table->primary(
                    [PermissionRegistrar::$pivotPermission, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_permissions_permission_model_type_primary'
                );
            }
        });

        Schema::create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
            $table->unsignedBigInteger(PermissionRegistrar::$pivotRole);

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type'], 'model_has_roles_model_id_model_type_index');

            $table->foreign(PermissionRegistrar::$pivotRole)
                ->references('id') // role id
                ->on($tableNames['roles'])
                ->onDelete('cascade');
            if ($teams) {
                $table->unsignedBigInteger($columnNames['team_foreign_key']);
                $table->index($columnNames['team_foreign_key'], 'model_has_roles_team_foreign_key_index');

                $table->primary(
                    [$columnNames['team_foreign_key'], PermissionRegistrar::$pivotRole, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_roles_role_model_type_primary'
                );
            } else {
                $table->primary(
                    [PermissionRegistrar::$pivotRole, $columnNames['model_morph_key'], 'model_type'],
                    'model_has_roles_role_model_type_primary'
                );
            }
        });

        Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->unsignedBigInteger(PermissionRegistrar::$pivotPermission);
            $table->unsignedBigInteger(PermissionRegistrar::$pivotRole);

            $table->foreign(PermissionRegistrar::$pivotPermission)
                ->references('id') // permission id
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->foreign(PermissionRegistrar::$pivotRole)
                ->references('id') // role id
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary([PermissionRegistrar::$pivotPermission, PermissionRegistrar::$pivotRole], 'role_has_permissions_permission_id_role_id_primary');
        });

        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));

        /**
         * business_unit_user
         */
        Schema::create('business_unit_user', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('business_unit_id');
            $table->foreign('business_unit_id')->references('id')->on('business_units')->onDelete('cascade');
            $table->primary(['user_id', 'business_unit_id']);
            $table->timestamps();
        });

        /**
         * tmcr_domains
         */
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

        /**
         * tmcr_pages
         */
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
        //
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('investigate_summary');
        Schema::dropIfExists('page_url_lists');
        Schema::dropIfExists('page_sect_lists');
        Schema::dropIfExists('tracker_lists');
        Schema::dropIfExists('vendor_lists');
        Schema::dropIfExists('notes');
        Schema::dropIfExists('drafts');
        Schema::dropIfExists('business_units');

        /**
         * permission
         */
        $tableNames = config('permission.table_names');

        if (empty($tableNames)) {
            throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
        }

        Schema::drop($tableNames['role_has_permissions']);
        Schema::drop($tableNames['model_has_roles']);
        Schema::drop($tableNames['model_has_permissions']);
        Schema::drop($tableNames['roles']);
        Schema::drop($tableNames['permissions']);


        Schema::dropIfExists('business_unit_user');
        Schema::dropIfExists('tmcr_domains');
        Schema::dropIfExists('tmcr_pages');
    }
};
