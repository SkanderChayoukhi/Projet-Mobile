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
        Schema::create('group_tags', function (Blueprint $table) {
            $table->foreignId('group_id')->index();
            $table->foreign('group_id')->on('groups')->references('id')->cascadeOnDelete();
            $table->foreignId('tag_id')->index();
            $table->foreign('tag_id')->on('tags')->references('id')->cascadeOnDelete();
            $table->primary(['group_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_tags_pivot');
    }
};
