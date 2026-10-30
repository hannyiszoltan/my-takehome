import { useState } from "react";
import type { SubmitEvent } from "react";
import { CitySelect } from "./components/CitySelect";
import { DateRangeSelect } from "./components/DateRangeSelect";
import { RegionSelect } from "./components/RegionSelect";
import { UnitToggle } from "./components/UnitToggle";
import { WeatherModeToggle } from "./components/WeatherModeToggle";
import { WeatherTable } from "./components/WeatherTable";
import { useCities } from "./hooks/useCities";
import { useRegions } from "./hooks/useRegions";
import { useWeather } from "./hooks/useWeather";
import type { WeatherFilters, WeatherMode } from "./types/weather";
import type { UnitSystem } from "./types/units";
import { getDateRangeError } from "./utils/dateRange";
import { areWeatherFiltersEqual } from "./utils/weatherFilters";

interface SubmittedQuery {
  filters: WeatherFilters;
  locationName: string;
}

export function App() {
  const [mode, setMode] = useState<WeatherMode>("city");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(
    null,
  );
  const [from, setFrom] = useState("1901-01-01");
  const [to, setTo] = useState("1901-01-01");
  const [submissionId, setSubmissionId] = useState(0);
  const [submittedQuery, setSubmittedQuery] = useState<SubmittedQuery | null>(
    null,
  );
  const dateRangeError = getDateRangeError(from, to);
  const citiesQuery = useCities();
  const regionsQuery = useRegions();
  const cities = citiesQuery.data ?? [];
  const regions = regionsQuery.data ?? [];
  const selectedCity =
    cities.find((city) => city.id === selectedCityId) ?? cities[0];
  const selectedRegion =
    regions.find(({ region }) => region === selectedRegionName) ?? regions[0];

  function buildDraftQuery(): SubmittedQuery | null {
    if (mode === "city" && selectedCity) {
      return {
        filters: { mode: "city", cityId: selectedCity.id, from, to },
        locationName: selectedCity.name,
      };
    }

    if (mode === "region" && selectedRegion) {
      return {
        filters: { mode: "region", region: selectedRegion.region, from, to },
        locationName: selectedRegion.region,
      };
    }

    return null;
  }

  const draftQuery = buildDraftQuery();
  const weatherQuery = useWeather(submittedQuery?.filters ?? null);
  const canSubmit =
    draftQuery !== null && dateRangeError === null && !weatherQuery.isFetching;

  let tableCaption = "";
  if (submittedQuery) {
    const { filters, locationName } = submittedQuery;
    const description =
      filters.mode === "region" ? "átlagolt időjárása" : "időjárása";
    tableCaption = `${locationName} ${description} · ${filters.from} – ${filters.to}`;
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setSubmissionId((id) => id + 1);

    if (areWeatherFiltersEqual(submittedQuery?.filters, draftQuery.filters)) {
      void weatherQuery.refetch();
      return;
    }

    setSubmittedQuery(draftQuery);
  }

  function handleModeChange(nextMode: WeatherMode) {
    if (nextMode !== mode) {
      setMode(nextMode);
      setSubmittedQuery(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section
        aria-label="Időjárási adatok"
        className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <WeatherModeToggle mode={mode} onModeChange={handleModeChange} />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-x-4 gap-y-2 p-5 text-base text-slate-900 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto]"
        >
          {mode === "city" ? (
            <CitySelect
              cities={cities}
              cityId={selectedCity?.id ?? null}
              onCityChange={setSelectedCityId}
              isPending={citiesQuery.isPending}
              error={citiesQuery.isError ? citiesQuery.error.message : null}
            />
          ) : (
            <RegionSelect
              regions={regions}
              region={selectedRegion?.region ?? null}
              onRegionChange={setSelectedRegionName}
              isPending={regionsQuery.isPending}
              error={regionsQuery.isError ? regionsQuery.error.message : null}
            />
          )}
          <DateRangeSelect
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            error={dateRangeError}
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-11 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 lg:mt-7"
          >
            {weatherQuery.isFetching ? "Lekérdezés…" : "Lekérdezés"}
          </button>
        </form>
        <UnitToggle
          unitSystem={unitSystem}
          onUnitSystemChange={setUnitSystem}
        />
        {submittedQuery ? (
          <WeatherTable
            key={submissionId}
            rows={weatherQuery.data?.weather ?? []}
            isPending={weatherQuery.isPending}
            error={weatherQuery.isError ? weatherQuery.error.message : null}
            caption={tableCaption}
            unitSystem={unitSystem}
          />
        ) : (
          <p className="border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-600">
            Állítsd be a szűrőket, majd kattints a Lekérdezés gombra.
          </p>
        )}
      </section>
    </main>
  );
}
