const ctx = document.getElementById('radarChart');

new Chart(ctx, {
  type: 'radar',
  data: {
    labels: [
      'Pushing',
      'Supporting',
      'Versatility',
      'Farming',
      'Emotionless',
      'Fighting'
    ],
    datasets: [
      {
        label: 'Christine',
        data: [1, 4, 3, 3, 2, 3],
        borderWidth: 1
      },
      {
        label: 'Jordan',
        data: [3, 2, 3, 6, 1, 5],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: { circular: true },
        beginAtZero: true,
        suggestedMin: 1,
        suggestedMax: 7
      }
    }
  }
});