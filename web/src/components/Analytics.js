import React from 'react';

function Analytics({ activities, goals }) {
  // Calculate various analytics
  const calculateAnalytics = () => {
    if (activities.length === 0) return null;

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Filter activities by time period
    const last30Days = activities.filter(activity => 
      new Date(activity.timestamp || Date.now()) >= thirtyDaysAgo
    );
    const last7Days = activities.filter(activity => 
      new Date(activity.timestamp || Date.now()) >= sevenDaysAgo
    );

    // Calculate totals by category
    const categoryTotals = activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + activity.co2;
      return acc;
    }, {});

    // Calculate monthly trend
    const monthlyData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.timestamp || Date.now());
        return activityDate.toDateString() === date.toDateString();
      });
      const dayTotal = dayActivities.reduce((sum, activity) => sum + activity.co2, 0);
      monthlyData.push({
        date: date.getDate(),
        co2: dayTotal,
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    // Calculate averages
    const dailyAverage = last30Days.reduce((sum, activity) => sum + activity.co2, 0) / 30;
    const weeklyAverage = last7Days.reduce((sum, activity) => sum + activity.co2, 0) / 7;

    // Calculate improvement
    const firstHalf = last30Days.slice(0, 15).reduce((sum, activity) => sum + activity.co2, 0) / 15;
    const secondHalf = last30Days.slice(15).reduce((sum, activity) => sum + activity.co2, 0) / 15;
    const improvement = ((firstHalf - secondHalf) / firstHalf) * 100;

    return {
      categoryTotals,
      monthlyData,
      dailyAverage,
      weeklyAverage,
      improvement,
      totalActivities: activities.length,
      totalCO2: activities.reduce((sum, activity) => sum + activity.co2, 0),
      last30DaysCO2: last30Days.reduce((sum, activity) => sum + activity.co2, 0),
      last7DaysCO2: last7Days.reduce((sum, activity) => sum + activity.co2, 0)
    };
  };

  const analytics = calculateAnalytics();

  if (!analytics) {
    return (
      <div className="card">
        <h3>📊 Analytics</h3>
        <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          Start tracking activities to see your analytics!
        </p>
      </div>
    );
  }

  const categoryColors = {
    transport: '#2196F3',
    energy: '#FF9800',
    food: '#4CAF50',
    waste: '#9C27B0'
  };

  const categoryIcons = {
    transport: '🚗',
    energy: '⚡',
    food: '🍽️',
    waste: '🗑️'
  };

  return (
    <div className="card">
      <h3>📊 Your Environmental Analytics</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-4" style={{ marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', color: '#2E7D32', fontWeight: 'bold' }}>
            {analytics.totalCO2.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Total CO₂ (kg)</div>
        </div>
        <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', color: '#2196F3', fontWeight: 'bold' }}>
            {analytics.dailyAverage.toFixed(1)}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Daily Average</div>
        </div>
        <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', color: analytics.improvement > 0 ? '#4CAF50' : '#f44336', fontWeight: 'bold' }}>
            {analytics.improvement > 0 ? '-' : '+'}{Math.abs(analytics.improvement).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>30-Day Trend</div>
        </div>
        <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', color: '#FF9800', fontWeight: 'bold' }}>
            {analytics.totalActivities}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Activities Logged</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ marginBottom: '15px' }}>🎯 Impact by Category</h4>
        <div className="grid grid-2">
          {Object.entries(analytics.categoryTotals).map(([category, total]) => (
            <div key={category} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '15px',
              border: '1px solid #eee',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                marginRight: '15px',
                width: '50px',
                textAlign: 'center'
              }}>
                {categoryIcons[category]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {category}
                  </span>
                  <span style={{ color: categoryColors[category], fontWeight: 'bold' }}>
                    {total.toFixed(1)} kg CO₂
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  background: '#eee', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(total / analytics.totalCO2) * 100}%`,
                    height: '100%',
                    background: categoryColors[category]
                  }}></div>
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#666', 
                  marginTop: '5px' 
                }}>
                  {((total / analytics.totalCO2) * 100).toFixed(1)}% of total impact
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Impact Comparison */}
      <div style={{ 
        background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
        padding: '20px',
        borderRadius: '12px'
      }}>
        <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🌍 Your Environmental Impact</h4>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🌳</div>
            <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>
              {(analytics.totalCO2 / 22).toFixed(1)} trees
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>needed to offset</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🚗</div>
            <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>
              {(analytics.totalCO2 / 0.21).toFixed(0)} km
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>car driving equivalent</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>⚡</div>
            <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>
              {(analytics.totalCO2 / 0.5).toFixed(0)} kWh
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>electricity equivalent</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;