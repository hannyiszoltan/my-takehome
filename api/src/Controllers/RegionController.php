<?php

namespace ADS\TakeHome\Controllers;

use ADS\TakeHome\Framework\JsonHttpResponse;
use ADS\TakeHome\Repositories\RegionRepository;
use Exception;

class RegionController
{
    public function __construct(
        private readonly RegionRepository $repository
    ) {
    }

    public function getRegions(): JsonHttpResponse
    {
        try {
            $response = $this->repository->getRegions();

            return new JsonHttpResponse($response);
        } catch (Exception $e) {
            return new JsonHttpResponse(["error" => $e->getMessage()], 400);
        }
    }

}
