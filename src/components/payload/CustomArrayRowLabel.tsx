'use client';
import React from 'react';
import { useRowLabel } from '@payloadcms/ui';

export const CustomArrayRowLabel: React.FC<any> = () => {
  const { data, rowNumber } = useRowLabel<any>();
  return <div>{data?.title || data?.question || `Item #${(rowNumber || 1) - 1}`}</div>;
};
