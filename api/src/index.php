<?php

namespace ADS\TakeHome;

include __DIR__ . "/../vendor/autoload.php";

use ADS\TakeHome\Controllers\ExampleController;
use ADS\TakeHome\Controllers\TemperatureController;
use ADS\TakeHome\Framework\MySQL;
use ADS\TakeHome\Framework\Router;
use ADS\TakeHome\Repositories\TemperatureRepository;
use ADS\TakeHome\Services\TemperatureService;

$router = new Router();

//Database
$mysql = new MySQL("db", "weather", "root", "root");

//Repository
$temperatureRepository = new TemperatureRepository(db: $mysql);

//Service
$temperatureService = new TemperatureService($temperatureRepository);

//Controller
$helloController = new ExampleController(greeting: "Hello", db: $mysql);
$temperatureController = new TemperatureController($temperatureService);

$router->addRoute("GET", "/hello", $helloController->sayHello(...));
$router->addRoute("GET", "/budapest", $helloController->getBudapestMaxTempCount(...));
$router->addRoute("GET", "/temperatures", $temperatureController->index(...));
// TODO: többi végpont

$router->handleRequest();
