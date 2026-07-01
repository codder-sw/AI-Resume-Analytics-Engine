import ReactECharts from 'echarts-for-react';

export default function BarChart({ skillCategories }: { skillCategories: Record<string, string[]> }) {
  const entries = Object.entries(skillCategories)
    .filter(([, v]) => v.length > 0)
    .sort(([, a], [, b]) => b.length - a.length);

  const option = {
    grid: { left: 80, right: 16, top: 8, bottom: 8 },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#475569', fontSize: 10 },
      splitLine: { lineStyle: { color: '#1e293b' } },
    },
    yAxis: {
      type: 'category',
      data: entries.map(([k]) => k),
      axisLabel: { color: '#94a3b8', fontSize: 11 },
    },
    series: [{
      type: 'bar',
      data: entries.map(([, v]) => v.length),
      itemStyle: { color: '#6366f1', borderRadius: 4 },
      barMaxWidth: 20,
    }],
    backgroundColor: 'transparent',
  };
  return <ReactECharts option={option} style={{ height: 200 }} />;
}