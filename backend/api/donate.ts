import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { access, mkdir, readFile, writeFile } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import { join } from 'path';

const DONATIONS_DIR = join(process.cwd(), 'data');
const DONATIONS_FILE = join(DONATIONS_DIR, 'donations.json');

interface DonateBody {
  name: string;
  email: string;
  amount: number;
  currency: string;
  method: 'stripe' | 'ton';
}

const donateRequestSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'amount', 'currency', 'method'],
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      amount: { type: 'number', minimum: 1 },
      currency: { type: 'string', minLength: 1 },
      method: { type: 'string', enum: ['stripe', 'ton'] }
    }
  }
};

const ensureDonationsFile = async () => {
  await mkdir(DONATIONS_DIR, { recursive: true });

  try {
    await access(DONATIONS_FILE, fsConstants.F_OK);
  } catch {
    await writeFile(DONATIONS_FILE, '[]', 'utf-8');
  }
};

const readDonations = async (): Promise<DonateBody[]> => {
  try {
    const fileContent = await readFile(DONATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent);

    if (Array.isArray(parsed)) {
      return parsed as DonateBody[];
    }
  } catch {
    // If parsing fails or file doesn't exist, fall back to an empty array.
  }

  return [];
};

const appendDonation = async (donation: DonateBody & { createdAt: string }) => {
  const donations = await readDonations();
  donations.push(donation);
  await writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 2), 'utf-8');
};

export const registerDonateEndpoint = (app: FastifyInstance) => {
  app.post(
    '/donate',
    {
      schema: donateRequestSchema
    },
    async (request: FastifyRequest<{ Body: DonateBody }>, reply: FastifyReply) => {
      await ensureDonationsFile();

      const donation = {
        ...request.body,
        createdAt: new Date().toISOString()
      };

      await appendDonation(donation);

      reply.send({ success: true });
    }
  );
};
