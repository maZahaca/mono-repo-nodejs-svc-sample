import { currencyProvider } from '@common/go-grpc';
import { getEcbRates } from '../utils';
import { BASE_CURRENCY } from '../consts';

export default async (
  _: currencyProvider.GetSupportedCurrenciesRequest,
): Promise<currencyProvider.GetSupportedCurrenciesResponse> => {
  return new currencyProvider.GetSupportedCurrenciesResponse({
    currencies: (await getEcbRates()).map(({ currency }) => currency),
    baseCurrency: BASE_CURRENCY,
  });
};
