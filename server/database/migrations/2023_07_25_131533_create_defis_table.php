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
        Schema::create('user_defis', function (Blueprint $table) {
            $table->foreignId('group_card_id')->index();
            $table->foreign('group_card_id')->on('group_cards')->references('id')->cascadeOnDelete();
            $table->foreignId('user_id')->index();
            $table->foreign('user_id')->on('users')->references('id')->cascadeOnDelete();
            $table->tinyInteger('has_finished')->default(0);
            $table->primary(['group_card_id', 'user_id']);
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
        Schema::dropIfExists('user_defis');
    }
};
