<?php

declare(strict_types=1);

namespace ADS\TakeHome\Services;

use ADS\TakeHome\Enums\Region;
use ADS\TakeHome\Repositories\WeatherRepository;
use DateTimeImmutable;
use InvalidArgumentException;

/**
 * @phpstan-import-type WeatherRow from WeatherRepository
 */
class WeatherService
{
    public function __construct(
        private readonly WeatherRepository $repository
    ) {
    }

    /**
     * @return list<WeatherRow>
     */
    public function getWeatherByCity(
        int $cityId,
        string $from,
        string $to,
    ): array {
        if ($cityId <= 0) {
            throw new InvalidArgumentException(
                "Érvénytelen 'city_id' query paraméter"
            );
        }

        $dateRange = $this->parseDateRange($from, $to);

        return $this->repository->findByCityAndDateRange(
            $cityId,
            $dateRange["from"],
            $dateRange["to"]
        );
    }

    /**
     * @return list<WeatherRow>
     */
    public function getWeatherByRegion(
        string $region,
        string $from,
        string $to
    ): array {
        if (!Region::tryFrom($region)) {
            throw new InvalidArgumentException(
                "Érvénytelen 'region' query paraméter"
            );
        }

        $dateRange = $this->parseDateRange($from, $to);

        return $this->repository->findByRegionAndDateRange(
            $region,
            $dateRange["from"],
            $dateRange["to"]
        );
    }

    private function parseDate(string $value): DateTimeImmutable
    {
        $date = DateTimeImmutable::createFromFormat(
            "!Y-m-d",
            $value
        );

        if (!$date || $date->format("Y-m-d") !== $value) {
            throw new InvalidArgumentException(
                "Érvénytelen dátum formátum. elvárt: YYYY-MM-DD"
            );
        }

        return $date;
    }

    /**
     * @return array{from: int, to: int}
     */
    private function parseDateRange(
        string $from,
        string $to
    ): array {
        $fromDate = $this->parseDate($from);
        $toDate = $this->parseDate($to);

        if ($fromDate > $toDate) {
            throw new InvalidArgumentException(
                "A kezdeti dátumnak kisebbnek vagy egyenlőnek kell lennie a végső dátumnál"
            );
        }

        return [
            "from" => (int) $fromDate->format('Ymd'),
            "to" => (int) $toDate->format('Ymd'),
        ];
    }
}
