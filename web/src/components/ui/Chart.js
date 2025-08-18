import React, { useEffect, useRef } from 'react';
import './Chart.css';

const Chart = ({ 
  data = [], 
  type = 'line', 
  width = 400, 
  height = 300, 
  title = '',
  xLabel = '',
  yLabel = '',
  color = '#2E7D32',
  showGrid = true,
  showLegend = true,
  animate = true
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    // Set canvas size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart based on type
    switch (type) {
      case 'line':
        drawLineChart(ctx, data, canvas.width, canvas.height, color, showGrid);
        break;
      case 'bar':
        drawBarChart(ctx, data, canvas.width, canvas.height, color, showGrid);
        break;
      case 'pie':
        drawPieChart(ctx, data, canvas.width, canvas.height);
        break;
      case 'area':
        drawAreaChart(ctx, data, canvas.width, canvas.height, color, showGrid);
        break;
      default:
        drawLineChart(ctx, data, canvas.width, canvas.height, color, showGrid);
    }
    
    // Add labels if provided
    if (title) {
      drawTitle(ctx, title, canvas.width);
    }
    
  }, [data, type, color, showGrid, title]);

  const drawLineChart = (ctx, data, width, height, color, showGrid) => {
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Find min/max values
    const values = data.map(d => d.value || d.y || d);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;
    
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= data.length - 1; i++) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }
    }
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const value = point.value || point.y || point;
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = color;
    data.forEach((point, index) => {
      const value = point.value || point.y || point;
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const drawBarChart = (ctx, data, width, height, color, showGrid) => {
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const values = data.map(d => d.value || d.y || d);
    const maxValue = Math.max(...values);
    
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }
    
    // Draw bars
    ctx.fillStyle = color;
    data.forEach((point, index) => {
      const value = point.value || point.y || point;
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;
      
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  };

  const drawPieChart = (ctx, data, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    const total = data.reduce((sum, d) => sum + (d.value || d.y || d), 0);
    let currentAngle = -Math.PI / 2;
    
    const colors = [
      '#2E7D32', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7',
      '#FF9800', '#FFA726', '#FFB74D', '#FFCC02', '#FFD54F'
    ];
    
    data.forEach((point, index) => {
      const value = point.value || point.y || point;
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      
      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX, labelY);
      
      currentAngle += sliceAngle;
    });
  };

  const drawAreaChart = (ctx, data, width, height, color, showGrid) => {
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const values = data.map(d => d.value || d.y || d);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;
    
    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, color + '80');
    gradient.addColorStop(1, color + '20');
    
    // Draw area
    ctx.fillStyle = gradient;
    ctx.beginPath();
    
    // Start from bottom left
    ctx.moveTo(padding, height - padding);
    
    // Draw line to each point
    data.forEach((point, index) => {
      const value = point.value || point.y || point;
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
      ctx.lineTo(x, y);
    });
    
    // Close path to bottom right
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw line on top
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((point, index) => {
      const value = point.value || point.y || point;
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
  };

  const drawTitle = (ctx, title, width) => {
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 30);
  };

  return (
    <div className="chart-container" ref={containerRef} style={{ width, height }}>
      <canvas ref={canvasRef} className="chart-canvas" />
      {showLegend && data.length > 0 && data[0].label && (
        <div className="chart-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: color }}
              />
              <span className="legend-label">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chart;