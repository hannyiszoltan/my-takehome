<?php

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class RegionRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {}

    public function getRegions(): array
    {
        $sql = "SELECT DISTINCT region FROM cities ";

        return $this->db->queryAssoc($sql);
    }
}