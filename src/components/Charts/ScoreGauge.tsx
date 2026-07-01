import ReactECharts from 'echarts-for-react';

export default function ScoreGauge({ score }: { score: number }) {
  const option = {
    series: [{
      type: 'gauge',
      startAngle: 200, endAngle: -20,
      min: 0, max: 100, radius: '90%',
      axisLine: {
        lineStyle: {
          width: 16,
          color: [[score / 100, '#6366f1'], [1, 'rgba(255,255,255,0.06)']],
        },
      },
      pointer: { itemStyle: { color: '#6366f1' }, length: '60%', width: 4 },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      detail: {
        formatter: '{value}',
        color: 'var(--text, #f1f5f9)',
        fontSize: 28, fontWeight: 'bold',
        offsetCenter: [0, '30%'],
      },
      data: [{ value: Math.round(score) }],
    }],
    backgroundColor: 'transparent',
  };
  return <ReactECharts option={option} style={{ height: 200 }} />;
}