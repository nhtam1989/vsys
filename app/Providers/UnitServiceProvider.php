<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class UnitServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        /*
         * =============== REPOSITORY ===============
         * */
        $this->app->bind(
            'App\Repositories\UnitRepositoryInterface',
            'App\Repositories\Eloquent\UnitEloquentRepository'
        );

        /*
         * =============== SERVICE ===============
         * */
        $this->app->bind(
            'App\Services\UnitServiceInterface',
            'App\Services\Implement\UnitService'
        );
    }
}
