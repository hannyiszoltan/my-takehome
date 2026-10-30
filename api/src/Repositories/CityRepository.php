<?php

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class CityRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    /**
     * @return list<array{id: int, name: string, region: string}>
     */
    public function getCities(): array
    {
        $sql = "SELECT id, name, region FROM cities";

        $rows = $this->db->queryAssoc($sql);

        return array_map(static fn (array $row): array => [
            "id" => (int) $row["id"],
            "name" => (string) $row["name"],
            "region" => (string) $row["region"],
        ], $rows);
    }
}
