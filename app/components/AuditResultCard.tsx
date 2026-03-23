'use client';

import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import {
  WarningCircleIcon,
  CheckCircleIcon,
  ExclamationMarkIcon,
} from '@phosphor-icons/react';

interface AnalysisMetric {
  kategori: string;
  skor: number;
  insight: string;
}

interface AuditResult {
  summary: string;
  status: 'Sangat Baik' | 'Cukup' | 'Perlu Perbaikan';
  analysis_metrics: AnalysisMetric[];
  development_recommendations: string[];
  technical_notes?: string;
}

const getStatusColor = (status: string): 'success' | 'warning' | 'danger' => {
  switch (status) {
    case 'Sangat Baik':
      return 'success';
    case 'Cukup':
      return 'warning';
    case 'Perlu Perbaikan':
      return 'danger';
    default:
      return 'warning';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Sangat Baik':
      return <CheckCircleIcon size={20} weight='fill' />;
    case 'Cukup':
      return <WarningCircleIcon size={20} weight='fill' />;
    case 'Perlu Perbaikan':
      return <ExclamationMarkIcon size={20} weight='fill' />;
    default:
      return null;
  }
};

const getMetricColor = (
  skor: number,
): 'success' | 'secondary' | 'warning' | 'danger' => {
  if (skor >= 80) return 'success';
  if (skor >= 60) return 'secondary';
  if (skor >= 40) return 'warning';
  return 'danger';
};

export default function AuditResultCard({ data }: { data: AuditResult }) {
  return (
    <div className='w-full space-y-4'>
      {/* Summary Card */}
      <Card className='bg-gradient-to-r from-slate-800 to-slate-900'>
        <CardHeader className='flex flex-col items-start px-6 py-4'>
          <div className='flex gap-3 items-center w-full'>
            <div className='text-2xl'>{getStatusIcon(data.status)}</div>
            <Chip
              startContent={getStatusIcon(data.status)}
              variant='flat'
              color={getStatusColor(data.status)}
              size='lg'
              className='text-white'
            >
              {data.status}
            </Chip>
          </div>
        </CardHeader>
        <CardBody className='px-6 pb-6 pt-0'>
          <p className='text-slate-100 text-base leading-relaxed'>
            {data.summary}
          </p>
        </CardBody>
      </Card>

      {/* Metrics Card */}
      {data.analysis_metrics && data.analysis_metrics.length > 0 && (
        <Card className='bg-slate-800'>
          <CardHeader className='flex flex-col items-start px-6 py-4'>
            <h3 className='text-lg font-semibold text-slate-100'>
              Analisis Metrik
            </h3>
          </CardHeader>
          <CardBody className='px-6 pb-6 gap-4'>
            {data.analysis_metrics.map((metric, index) => (
              <div
                key={index}
                className='border-b border-slate-700 pb-4 last:border-b-0'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='font-medium text-slate-100'>
                    {metric.kategori}
                  </h4>
                  <Chip
                    variant='flat'
                    color={getMetricColor(metric.skor)}
                    size='sm'
                    className='font-semibold'
                  >
                    {metric.skor}%
                  </Chip>
                </div>
                <p className='text-slate-300 text-sm'>{metric.insight}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {/* Recommendations Card */}
      {data.development_recommendations &&
        data.development_recommendations.length > 0 && (
          <Card className='bg-slate-800'>
            <CardHeader className='flex flex-col items-start px-6 py-4'>
              <h3 className='text-lg font-semibold text-slate-100'>
                Rekomendasi Pengembangan
              </h3>
            </CardHeader>
            <CardBody className='px-6 pb-6'>
              <ol className='space-y-3 list-decimal list-inside'>
                {data.development_recommendations.map(
                  (recommendation, index) => (
                    <li
                      key={index}
                      className='text-slate-300 text-sm leading-relaxed'
                    >
                      <span className='ml-1'>{recommendation}</span>
                    </li>
                  ),
                )}
              </ol>
            </CardBody>
          </Card>
        )}

      {/* Technical Notes */}
      {data.technical_notes && (
        <Card className='bg-slate-900 border border-slate-700'>
          <CardBody className='px-6 py-4'>
            <p className='text-xs text-slate-400 font-mono'>
              {data.technical_notes}
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
