import { currencyProvider } from '@common/go-grpc';
import { getEcbRates } from '../utils';
import { BASE_CURRENCY } from '../consts';

export default async (
  _: currencyProvider.GetRatesRequest,
): Promise<currencyProvider.GetRatesResponse> => {
  return new currencyProvider.GetRatesResponse({
    rates: (await getEcbRates())
      .map(({ currency, rate }) => new currencyProvider.GetRatesResponse.ExchangeRate({
        currency, rate,
      })),
    baseCurrency: BASE_CURRENCY,
  });
};
