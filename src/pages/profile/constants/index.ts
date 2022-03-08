export const RADER_DEFAULT_OPTION = {
  legend: {
    data: []
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '', max: 0 },
      { name: '', max: 0 },
      { name: '', max: 0 },
      { name: '', max: 0 },
      { name: '', max: 0 }
    ]
  },
  color: ['#91cc75'],
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [0, 0, 0, 0, 0],
          name: '个人综合能力',
          areaStyle: {
            color: 'rgba(145, 204, 117, 0.6)'
          }
        }
      ]
    }
  ]
};
