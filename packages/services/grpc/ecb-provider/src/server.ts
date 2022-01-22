import { Server, LoadProtoOptions, currencyProvider } from '@common/go-grpc';
import getSupportedCurrencies from './services/getSupportedCurrencies';
import getRates from './services/getRates';

const { PORT = 50051 } = process.env;
const protoOptions: LoadProtoOptions = {
  path: `${__dirname}/../../../../../proto/ecb-provider.proto`,
  package: 'ecbProvider',
  service: 'EcbProvider',
  options: {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
};

const server = new Server(`0.0.0.0:${PORT}`, protoOptions);

// gRPC methods implementation
server
  .addService<currencyProvider.GetSupportedCurrenciesRequest,
    Promise<currencyProvider.GetSupportedCurrenciesResponse>>('GetSupportedCurrencies', getSupportedCurrencies)
  .addService<currencyProvider.GetRatesRequest,
    Promise<currencyProvider.GetRatesResponse>>('GetRates', getRates);

export default server;
