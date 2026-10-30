<?php

declare(strict_types=1);

namespace ADS\TakeHome\Tests;

use ADS\TakeHome\Repositories\WeatherRepository;
use ADS\TakeHome\Services\WeatherService;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

class WeatherServiceTest extends TestCase
{
    public function testCityQueryAcceptsASingleLeapDay(): void
    {
        $rows = [[
            'date' => 20240229,
            'minTemp' => -2.0,
            'maxTemp' => 4.0,
            'avgTemp' => 1.0,
            'precipitation' => null,
        ]];
        $repository = $this->createMock(WeatherRepository::class);
        $repository->expects($this->once())
            ->method('findByCityAndDateRange')
            ->with(1, 20240229, 20240229)
            ->willReturn($rows);

        $service = new WeatherService($repository);

        $this->assertSame($rows, $service->getWeatherByCity(1, '2024-02-29', '2024-02-29'));
    }

    public function testRegionQueryReturnsAnEmptyResultWhenThereAreNoMeasurements(): void
    {
        $repository = $this->createMock(WeatherRepository::class);
        $repository->expects($this->once())
            ->method('findByRegionAndDateRange')
            ->with('Dunántúl', 20230101, 20230131)
            ->willReturn([]);

        $service = new WeatherService($repository);

        $this->assertSame([], $service->getWeatherByRegion('Dunántúl', '2023-01-01', '2023-01-31'));
    }

    public function testImpossibleDateIsRejectedBeforeQuerying(): void
    {
        $repository = $this->createMock(WeatherRepository::class);
        $repository->expects($this->never())->method('findByCityAndDateRange');
        $service = new WeatherService($repository);

        $this->expectException(InvalidArgumentException::class);

        $service->getWeatherByCity(1, '2023-02-29', '2023-03-01');
    }

    public function testReversedDateRangeIsRejectedBeforeQuerying(): void
    {
        $repository = $this->createMock(WeatherRepository::class);
        $repository->expects($this->never())->method('findByRegionAndDateRange');
        $service = new WeatherService($repository);

        $this->expectException(InvalidArgumentException::class);

        $service->getWeatherByRegion('Dunántúl', '2023-01-02', '2023-01-01');
    }

    public function testInvalidCityIdIsRejectedBeforeQuerying(): void
    {
        $repository = $this->createMock(WeatherRepository::class);
        $repository->expects($this->never())->method('findByCityAndDateRange');
        $service = new WeatherService($repository);

        $this->expectException(InvalidArgumentException::class);

        $service->getWeatherByCity(0, '2023-01-01', '2023-01-02');
    }

    public function testUnknownRegionIsRejectedBeforeQuerying(): void
    {
        $repository = $this->createMock(WeatherRepository::class);
        $repository->expects($this->never())->method('findByRegionAndDateRange');
        $service = new WeatherService($repository);

        $this->expectException(InvalidArgumentException::class);

        $service->getWeatherByRegion('Unknown region', '2023-01-01', '2023-01-02');
    }
}
