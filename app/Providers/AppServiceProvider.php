<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
{
    if (env('APP_ENV') === 'production') { // if production, set URL to HTTPS
        $this->app['request']->server->set('HTTPS','on'); 

        URL::forceSchema('https');
    }
}
}
