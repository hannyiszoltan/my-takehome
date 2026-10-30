<?php

declare(strict_types=1);

namespace ADS\TakeHome\Controllers;

use ADS\TakeHome\Framework\HttpRequest;
use ADS\TakeHome\Framework\HttpResponseInterface;
use ADS\TakeHome\Framework\JsonHttpResponse;
use ADS\TakeHome\Services\WeatherService;
use InvalidArgumentException;

class WeatherController
{
    public function __construct(
        private readonly WeatherService $service
    ) {
    }

    public function getByCity(HttpRequest $request): HttpResponseInterface
    {
        try {
            $cityId = filter_var(
                $request->query["city_id"] ?? null,
                FILTER_VALIDATE_INT
            );

            $from = $request->query["from"] ?? null;
            $to = $request->query["to"] ?? null;

            if (
                $cityId === false ||
                !is_string($from) ||
                !is_string($to)
            ) {
                throw new InvalidArgumentException(
                    "Érvényes 'city_id', 'from' és 'to' paraméterek kötelezőek"
                );
            }

            $data = $this->service->getWeatherByCity(
                $cityId,
                $from,
                $to
            );

            $response = [
                "cityId" => $cityId,
                "from" => $from,
                "to" => $to,
                "weather" => $data,
            ];

            return new JsonHttpResponse($response);
        } catch (InvalidArgumentException $e) {
            return new JsonHttpResponse(["error" => $e->getMessage()], 400);
        }
    }

    public function getByRegion(HttpRequest $request): HttpResponseInterface
    {
        try {
            $region = $request->query["region"] ?? null;
            $from = $request->query["from"] ?? null;
            $to = $request->query["to"] ?? null;

            if (
                !is_string($region) ||
                !is_string($from) ||
                !is_string($to)
            ) {
                throw new InvalidArgumentException(
                    "Érvényes 'region', 'from' és 'to' paraméterek kötelezőek"
                );
            }

            $data = $this->service->getWeatherByRegion(
                $region,
                $from,
                $to
            );

            $response = [
                "region" => $region,
                "from" => $from,
                "to" => $to,
                "weather" => $data,
            ];

            return new JsonHttpResponse($response);
        } catch (InvalidArgumentException $e) {
            return new JsonHttpResponse(["error" => $e->getMessage()], 400);
        }
    }
}
