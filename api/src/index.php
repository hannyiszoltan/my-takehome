<?php

namespace ADS\TakeHome;

include __DIR__ . "/../vendor/autoload.php";

use ADS\TakeHome\Controllers\CityController;
use ADS\TakeHome\Controllers\RegionController;
use ADS\TakeHome\Controllers\WeatherController;
use ADS\TakeHome\Framework\MySQL;
use ADS\TakeHome\Framework\Router;
use ADS\TakeHome\Repositories\CityRepository;
use ADS\TakeHome\Repositories\RegionRepository;
use ADS\TakeHome\Repositories\WeatherRepository;
use ADS\TakeHome\Services\WeatherService;

$router = new Router();

//Database
$mysql = new MySQL("db", "weather", "root", "root");

//Repository
$weatherRepository = new WeatherRepository(db: $mysql);
$cityRepository = new CityRepository(db: $mysql);
$regionRepository = new RegionRepository(db: $mysql);

//Service
$weatherService = new WeatherService($weatherRepository);

//Controller
$weatherController = new WeatherController($weatherService);
$cityController = new CityController($cityRepository);
$regionController = new RegionController($regionRepository);

$router->addRoute("GET", "/cities", $cityController->getCities(...));
$router->addRoute("GET", "/regions", $regionController->getRegions(...));
$router->addRoute("GET", "/weather", $weatherController->getByCity(...));
$router->addRoute("GET", "/weather/region", $weatherController->getByRegion(...));

$router->handleRequest();
