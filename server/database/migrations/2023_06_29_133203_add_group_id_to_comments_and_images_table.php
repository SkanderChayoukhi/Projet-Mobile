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
        Schema::table('comments', function (Blueprint $table) {
            $table->foreignId('group_id')->index()->after('card_id')->nullable();
            $table->foreign('group_id')->on('groups')->references('id')->cascadeOnDelete();
        });
        Schema::table('images', function (Blueprint $table) {
            $table->foreignId('group_id')->index()->after('card_id')->nullable();
            $table->foreign('group_id')->on('groups')->references('id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            //
        });
    }
};
