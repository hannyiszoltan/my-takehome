<?php

declare(strict_types=1);

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

/**
 * @phpstan-type TemperatureRow array{
 *     date: int,
 *     maxTemp: float,
 *     minTemp: float,
 *     avgTemp: float,
 *     precipitation: float|null
 * }
 */
class TemperatureRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    /**
     * @return list<TemperatureRow>
     */
    public function findByCityAndDateRange(
        int $cityId,
        int $from,
        int $to,
    ): array {
        $sql = "SELECT 
                    maxT.date,
                    maxT.max_temp AS maxTemp,
                    minT.min_temp AS minTemp,
                    (minT.min_temp + maxT.max_temp) / 2.0 AS avgTemp,
                    p.precipitation
                FROM 
                    maximum_temperatures AS maxT
                INNER JOIN minimum_temperatures AS minT
                    ON maxT.city_id = minT.city_id
                    AND maxT.date = minT.date
                LEFT JOIN precipitation AS p
                    ON p.city_id = maxT.city_id
                    AND p.date = maxT.date
                WHERE 
                    maxT.city_id = :city_id 
                AND maxT.date BETWEEN :from AND :to 
                ORDER BY maxT.date ASC";

        $rows = $this->db->queryAssoc($sql, [":city_id" => $cityId, ":from" => $from, ":to" => $to]);

        return array_map($this->mapTemperatureRow(...), $rows);
    }

    /**
     * @return list<TemperatureRow>
     */
    public function findByRegionAndDateRange(
        string $region,
        int $from,
        int $to,
    ): array {

        $sql = "SELECT
                    maxT.date,
                    AVG(maxT.max_temp) As maxTemp,
                    AVG(minT.min_temp) AS minTemp,
                    AVG((minT.min_temp + maxT.max_temp) / 2.0) AS avgTemp,
                    AVG(p.precipitation) AS precipitation
                FROM cities AS c
                INNER JOIN maximum_temperatures AS maxT
                    ON maxT.city_id = c.id
                INNER JOIN minimum_temperatures AS minT
                    ON minT.city_id = maxT.city_id
                    AND minT.date = maxT.date
                LEFT JOIN precipitation AS p
                    ON p.city_id = maxT.city_id
                    AND p.date = maxT.date
                WHERE c.region = :region
                    AND maxT.date BETWEEN :from AND :to
                GROUP BY maxT.date
                ORDER BY maxT.date ASC";

        $rows = $this->db->queryAssoc($sql, [":region" => $region, ":from" => $from, ":to" => $to]);

        return array_map($this->mapTemperatureRow(...), $rows);
    }

    /**
     * @param array<string, scalar|null> $row
     * @return TemperatureRow
     */
    private function mapTemperatureRow(array $row): array
    {
        return [
            "date" => (int) $row["date"],
            "maxTemp" => (float) $row["maxTemp"],
            "minTemp" => (float) $row["minTemp"],
            "avgTemp" => (float) $row["avgTemp"],
            "precipitation" => $row["precipitation"] === null
                ? null
                : (float) $row["precipitation"],
        ];
    }
}
