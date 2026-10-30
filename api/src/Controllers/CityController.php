<?php

declare(strict_types=1);

namespace ADS\TakeHome\Controllers;

use ADS\TakeHome\Framework\JsonHttpResponse;
use ADS\TakeHome\Repositories\CityRepository;
use Exception;

class CityController
{
    public function __construct(
        private readonly CityRepository $repository
    ) {
    }

    public function getCities(): JsonHttpResponse
    {
        try {
            $response = $this->repository->getCities();

            return new JsonHttpResponse($response);
        } catch (Exception $e) {
            return new JsonHttpResponse(["error" => $e->getMessage()], 500);
        }
    }

}
