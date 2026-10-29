<?php

namespace ADS\TakeHome\Repositories;

use ADS\TakeHome\Framework\MySQL;

class CityRepository
{
    public function __construct(
        private readonly MySQL $db
    ) {}

    public function getCities(): array
    {
        $sql = "SELECT * FROM cities";

        return $this->db->queryAssoc($sql);
    }
}