import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

const RATE_URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

export const getEcbRates = async (): Promise<{ currency: string, rate: number }[]> => {
  const response = await fetch(RATE_URL);
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const {
    'gesmes:Envelope': {
      Cube: {
        Cube: { Cube }
      }
    }
  } = parser.parse(await response.text());

  return Cube;
};
