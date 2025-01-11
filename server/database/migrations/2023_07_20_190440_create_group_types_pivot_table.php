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
        Schema::create('group_types', function (Blueprint $table) {
            $table->foreignId('group_id')->index();
            $table->foreign('group_id')->on('groups')->references('id')->cascadeOnDelete();
            $table->foreignId('type_id')->index();
            $table->foreign('type_id')->on('types')->references('id')->cascadeOnDelete();
            $table->primary(['group_id', 'type_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_types_pivot');
    }
};
