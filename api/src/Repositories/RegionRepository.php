<?php

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class RegionRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {
    }

    /**
     * @return list<array<string, scalar|null>>
     */
    public function getRegions(): array
    {
        $sql = "SELECT DISTINCT region FROM cities ";

        return $this->db->queryAssoc($sql);
    }
}
