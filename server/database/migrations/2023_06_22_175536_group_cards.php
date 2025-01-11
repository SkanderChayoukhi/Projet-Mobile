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
        Schema::create('group_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('group_id')->index();
            $table->foreign('group_id')->on('groups')->references('id')->cascadeOnDelete();
            $table->foreignId('card_id')->index();
            $table->foreign('card_id')->on('cards')->references('id')->cascadeOnDelete();
            $table->tinyInteger('state')->default(0);
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
        //
    }
};
