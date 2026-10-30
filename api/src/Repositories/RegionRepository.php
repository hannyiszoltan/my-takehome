<?php

declare(strict_types=1);

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class RegionRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    /**
     * @return list<array{region: string}>
     */
    public function getRegions(): array
    {
        $sql = "SELECT DISTINCT region FROM cities ";

        $rows = $this->db->queryAssoc($sql);

        return array_map(static fn (array $row): array => [
            "region" => (string) $row["region"],
        ], $rows);
    }
}
