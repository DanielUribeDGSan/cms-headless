import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['payload', '@payloadcms/db-postgres', 'graphql', 'pg'],
};

export default withPayload(nextConfig);
