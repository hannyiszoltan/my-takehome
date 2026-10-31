<?php

declare(strict_types=1);

namespace ADS\TakeHome\Tests;

use ADS\TakeHome\Controllers\WeatherController;
use ADS\TakeHome\Framework\HttpRequest;
use ADS\TakeHome\Repositories\CityRepository;
use ADS\TakeHome\Repositories\WeatherRepository;
use ADS\TakeHome\Services\WeatherService;
use PHPUnit\Framework\TestCase;

class WeatherControllerTest extends TestCase
{
    public function testUnknownRegionReturns404WithoutFetchingWeather(): void
    {
        $cities = $this->createMock(CityRepository::class);
        $cities->expects($this->never())->method('exists');
        $weather = $this->createMock(WeatherRepository::class);
        $weather->expects($this->never())->method('findByRegionAndDateRange');
        $controller = new WeatherController(new WeatherService($weather, $cities));

        $response = $controller->getByRegion(new HttpRequest([
            'region' => 'Unknown region', 'from' => '2023-01-01', 'to' => '2023-01-02',
        ]));

        $this->assertSame(404, $response->getStatus());
        $body = $response->getBody();
        $this->assertIsString($body);
        $this->assertJsonStringEqualsJsonString(
            '{"error":"A megadott régió nem található."}',
            $body
        );
    }

    public function testUnknownCityReturns404WithoutFetchingWeather(): void
    {
        $cities = $this->createMock(CityRepository::class);
        $cities->expects($this->once())->method('exists')->with(999)->willReturn(false);
        $weather = $this->createMock(WeatherRepository::class);
        $weather->expects($this->never())->method('findByCityAndDateRange');
        $controller = new WeatherController(new WeatherService($weather, $cities));

        $response = $controller->getByCity(new HttpRequest([
            'city_id' => '999', 'from' => '2023-01-01', 'to' => '2023-01-02',
        ]));

        $this->assertSame(404, $response->getStatus());
        $body = $response->getBody();
        $this->assertIsString($body);
        $this->assertJsonStringEqualsJsonString(
            '{"error":"A megadott város nem található."}',
            $body
        );
    }

    public function testExistingCityWithoutMeasurementsReturns200(): void
    {
        $cities = $this->createMock(CityRepository::class);
        $cities->expects($this->once())->method('exists')->with(1)->willReturn(true);
        $weather = $this->createMock(WeatherRepository::class);
        $weather->expects($this->once())->method('findByCityAndDateRange')
            ->with(1, 20230101, 20230102)->willReturn([]);
        $controller = new WeatherController(new WeatherService($weather, $cities));

        $response = $controller->getByCity(new HttpRequest([
            'city_id' => '1', 'from' => '2023-01-01', 'to' => '2023-01-02',
        ]));

        $this->assertSame(200, $response->getStatus());
        $body = $response->getBody();
        $this->assertIsString($body);
        $this->assertJsonStringEqualsJsonString(
            '{"cityId":1,"from":"2023-01-01","to":"2023-01-02","weather":[]}',
            $body
        );
    }
}
