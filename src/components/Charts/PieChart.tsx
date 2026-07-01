import ReactECharts from 'echarts-for-react';

const COLORS = ['#818cf8', '#22d3ee', '#4ade80', '#facc15', '#fb923c', '#f87171'];

export default function PieChart({ skillCategories }: { skillCategories: Record<string, string[]> }) {
  const data = Object.entries(skillCategories)
    .filter(([, v]) => v.length > 0)
    .map(([name, skills], i) => ({
      name, value: skills.length,
      itemStyle: { color: COLORS[i % COLORS.length] },
    }));

  const option = {
    series: [{
      type: 'pie', radius: ['40%', '70%'],
      data: data.length > 0 ? data : [{ name: 'No Skills', value: 1, itemStyle: { color: '#334155' } }],
      label: { color: '#94a3b8', fontSize: 10 },
      labelLine: { lineStyle: { color: '#475569' } },
    }],
    backgroundColor: 'transparent',
  };
  return <ReactECharts option={option} style={{ height: 200 }} />;
}