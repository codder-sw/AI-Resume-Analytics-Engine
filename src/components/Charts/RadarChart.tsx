import ReactECharts from 'echarts-for-react';
import type { ScoreBreakdown } from '../../types';

export default function RadarChart({ breakdown }: { breakdown: ScoreBreakdown }) {
  const option = {
    radar: {
      indicator: [
        { name: 'Experience', max: 100 },
        { name: 'Skills', max: 100 },
        { name: 'Content', max: 100 },
        { name: 'ATS', max: 100 },
        { name: 'Education', max: 100 },
      ],
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { lineStyle: { color: '#334155' } },
      name: { color: '#94a3b8', fontSize: 11 },
    },
    series: [{
      type: 'radar',
      data: [{
        value: [breakdown.experienceScore, breakdown.skillsScore, breakdown.contentScore, breakdown.atsScore, breakdown.educationScore],
        areaStyle: { color: 'rgba(99,102,241,0.2)' },
        lineStyle: { color: '#6366f1', width: 2 },
        itemStyle: { color: '#6366f1' },
      }],
    }],
    backgroundColor: 'transparent',
  };
  return <ReactECharts option={option} style={{ height: 200 }} />;
}