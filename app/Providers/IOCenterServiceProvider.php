<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class IOCenterServiceProvider extends ServiceProvider
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
            'App\Repositories\IOCenterRepositoryInterface',
            'App\Repositories\Eloquent\IOCenterEloquentRepository'
        );

        /*
         * =============== SERVICE ===============
         * */
        $this->app->bind(
            'App\Services\IOCenterServiceInterface',
            'App\Services\Implement\IOCenterService'
        );
    }
}
