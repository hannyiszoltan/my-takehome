<?php

declare(strict_types=1);

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class CityRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    public function exists(int $cityId): bool
    {
        $sql = "SELECT 
                id 
            FROM 
                cities 
            WHERE 
                id = :city_id";

        $rows = $this->db->queryAssoc($sql, [":city_id" => $cityId]);

        return $rows !== [];
    }

    /**
     * @return list<array{id: int, name: string, region: string}>
     */
    public function getCities(): array
    {
        $sql = "SELECT 
                    id, 
                    name, 
                    region 
                FROM 
                    cities
                ORDER BY 
                    name";

        $rows = $this->db->queryAssoc($sql);

        return array_map(static fn (array $row): array => [
            "id" => (int) $row["id"],
            "name" => (string) $row["name"],
            "region" => (string) $row["region"],
        ], $rows);
    }
}
