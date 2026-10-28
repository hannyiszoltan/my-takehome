<?php

declare(strict_types=1);

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class TemperatureRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    /**
     * @return list<array<string, scalar|null>>
     */
    public function findByCityAndDateRange(
        int $cityId,
        int $from,
        int $to,
    ): array {
        $sql = "SELECT 
                    max_t.date,
                    max_t.max_temp,
                    min_t.min_temp
                FROM 
                    maximum_temperatures AS max_t
                INNER JOIN minimum_temperatures AS min_t
                    ON max_t.city_id = min_t.city_id
                    AND max_t.date = min_t.date
                WHERE 
                    max_t.city_id = :city_id 
                AND max_t.date BETWEEN :from AND :to 
                ORDER BY max_t.date ASC";

        return $this->db->queryAssoc($sql, [":city_id" => $cityId, ":from" => $from, ":to" => $to]);
    }
}
