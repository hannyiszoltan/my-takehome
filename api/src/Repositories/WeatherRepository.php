<?php

declare(strict_types=1);

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

/**
 * @phpstan-type WeatherRow array{
 *     date: int,
 *     maxTemp: float|null,
 *     minTemp: float|null,
 *     avgTemp: float|null,
 *     precipitation: float|null
 * }
 */
class WeatherRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    /**
     * @return list<WeatherRow>
     */
    public function findByCityAndDateRange(
        int $cityId,
        int $from,
        int $to,
    ): array {
        $sql = "SELECT 
                    maxT.date,
                    NULLIF(maxT.max_temp, -999) AS maxTemp,
                    NULLIF(minT.min_temp, -999) AS minTemp,
                    (NULLIF(minT.min_temp, -999)
                     + NULLIF(maxT.max_temp, -999)) / 2.0 AS avgTemp,
                    NULLIF(p.precipitation, -999) AS precipitation
                FROM 
                    maximum_temperatures AS maxT
                INNER JOIN minimum_temperatures AS minT
                    ON maxT.city_id = minT.city_id
                    AND maxT.date = minT.date
                INNER JOIN precipitation AS p
                    ON p.city_id = maxT.city_id
                    AND p.date = maxT.date
                WHERE 
                    maxT.city_id = :city_id 
                AND maxT.date BETWEEN :from AND :to 
                ORDER BY maxT.date ASC";

        $rows = $this->db->queryAssoc($sql, [":city_id" => $cityId, ":from" => $from, ":to" => $to]);

        return array_map($this->mapWeatherRow(...), $rows);
    }

    /**
     * @return list<WeatherRow>
     */
    public function findByRegionAndDateRange(
        string $region,
        int $from,
        int $to,
    ): array {
        //TODO Benne van a query-ben a -999 javítás ami meglett fogalmazva a db-suggestions-ben(6.)
        $sql = "SELECT
                    maxT.date,
                    AVG(NULLIF(maxT.max_temp, -999)) As maxTemp,
                    AVG(NULLIF(minT.min_temp, -999)) AS minTemp,
                    AVG(
                        (NULLIF(minT.min_temp, -999) 
                        + NULLIF(maxT.max_temp, -999)) / 2.0
                    ) AS avgTemp,
                    AVG(NULLIF(p.precipitation, -999)) AS precipitation
                FROM cities AS c
                INNER JOIN maximum_temperatures AS maxT
                    ON maxT.city_id = c.id
                INNER JOIN minimum_temperatures AS minT
                    ON minT.city_id = maxT.city_id
                    AND minT.date = maxT.date
                INNER JOIN precipitation AS p
                    ON p.city_id = maxT.city_id
                    AND p.date = maxT.date
                WHERE c.region = :region
                    AND maxT.date BETWEEN :from AND :to
                GROUP BY maxT.date
                ORDER BY maxT.date ASC";

        $rows = $this->db->queryAssoc($sql, [":region" => $region, ":from" => $from, ":to" => $to]);

        return array_map($this->mapWeatherRow(...), $rows);
    }

    /**
     * @param array<string, scalar|null> $row
     * @return WeatherRow
     */
    private function mapWeatherRow(array $row): array
    {
        return [
            "date" => (int) $row["date"],
            "maxTemp" => $row["maxTemp"] === null
                ? null
                : (float) $row["maxTemp"],
            "minTemp" => $row["minTemp"] === null
                ? null
                : (float) $row["minTemp"],
            "avgTemp" => $row["avgTemp"] === null
                ? null
                : (float) $row["avgTemp"],
            "precipitation" => $row["precipitation"] === null
                ? null
                : (float) $row["precipitation"],
        ];
    }
}
