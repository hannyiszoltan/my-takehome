<?php

namespace ADS\TakeHome;

include __DIR__ . "/../vendor/autoload.php";

use ADS\TakeHome\Controllers\CityController;
use ADS\TakeHome\Controllers\RegionController;
use ADS\TakeHome\Controllers\TemperatureController;
use ADS\TakeHome\Framework\MySQL;
use ADS\TakeHome\Framework\Router;
use ADS\TakeHome\Repositories\CityRepository;
use ADS\TakeHome\Repositories\RegionRepository;
use ADS\TakeHome\Repositories\TemperatureRepository;
use ADS\TakeHome\Services\TemperatureService;

$router = new Router();

//Database
$mysql = new MySQL("db", "weather", "root", "root");

//Repository
$temperatureRepository = new TemperatureRepository(db: $mysql);
$cityRepository = new CityRepository(db: $mysql);
$regionRepository = new RegionRepository(db: $mysql);

//Service
$temperatureService = new TemperatureService($temperatureRepository);

//Controller
$temperatureController = new TemperatureController($temperatureService);
$cityController = new CityController($cityRepository);
$regionController = new RegionController($regionRepository);

$router->addRoute("GET", "/cities", $cityController->getCities(...));
$router->addRoute("GET", "/regions", $regionController->getRegions(...));
$router->addRoute("GET", "/temperatures", $temperatureController->getByCity(...));
$router->addRoute("GET", "/temperatures/region", $temperatureController->getByRegion(...));

$router->handleRequest();
