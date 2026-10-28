<?php

declare(strict_types=1);

namespace ADS\TakeHome\Services;

use ADS\TakeHome\Repositories\TemperatureRepository;
use DateTimeImmutable;
use InvalidArgumentException;

class TemperatureService
{
    public function __construct(
        private readonly TemperatureRepository $repository
    ) {
    }

    /**
     * @return list<array<string, scalar|null>>
     */
    public function getTemperatures(
        int $cityId,
        string $from,
        string $to,
    ): array {
        if ($cityId <= 0) {
            throw new InvalidArgumentException(
                "Érvénytelen 'city_id' query paraméter"
            );
        }

        $fromDate = $this->parseDate($from);
        $toDate = $this->parseDate($to);

        if ($fromDate > $toDate) {
            throw new InvalidArgumentException(
                "A kezdeti dátumnak kisebbnek kell lennie a végső dátumnál"
            );
        }

        $fromInt = (int) $fromDate->format('Ymd');
        $toInt = (int) $toDate->format('Ymd');

        return $this->repository->findByCityAndDateRange(
            $cityId,
            $fromInt,
            $toInt
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
}
