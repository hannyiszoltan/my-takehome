<?php

declare(strict_types=1);

namespace ADS\TakeHome\Tests;

use ADS\TakeHome\Framework\MySQL;
use ADS\TakeHome\Repositories\WeatherRepository;
use PHPUnit\Framework\TestCase;

class WeatherRepositoryTest extends TestCase
{
    public function testNumericStringsAreConvertedAndMissingValuesStayNull(): void
    {
        $db = $this->createMock(MySQL::class);
        $db->expects($this->once())
            ->method('queryAssoc')
            ->with($this->isType('string'), [':city_id' => 1, ':from' => 20230101, ':to' => 20230102])
            ->willReturn([
                [
                    'date' => '20230101',
                    'minTemp' => '-2.5',
                    'maxTemp' => '4.5',
                    'avgTemp' => '1.0',
                    'precipitation' => '0',
                ],
                [
                    'date' => '20230102',
                    'minTemp' => null,
                    'maxTemp' => null,
                    'avgTemp' => null,
                    'precipitation' => null,
                ],
            ]);
        $repository = new WeatherRepository($db);

        $this->assertSame([
            [
                'date' => 20230101,
                'maxTemp' => 4.5,
                'minTemp' => -2.5,
                'avgTemp' => 1.0,
                'precipitation' => 0.0,
            ],
            [
                'date' => 20230102,
                'maxTemp' => null,
                'minTemp' => null,
                'avgTemp' => null,
                'precipitation' => null,
            ],
        ], $repository->findByCityAndDateRange(1, 20230101, 20230102));
    }
}
