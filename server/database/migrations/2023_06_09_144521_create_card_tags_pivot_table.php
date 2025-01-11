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
        Schema::create('card_tags', function (Blueprint $table) {
            $table->foreignId('card_id')->index();
            $table->foreign('card_id')->on('cards')->references('id')->cascadeOnDelete();
            $table->foreignId('tag_id')->index();
            $table->foreign('tag_id')->on('tags')->references('id')->cascadeOnDelete();
            $table->primary(['card_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('card_tags_pivot');
    }
};
