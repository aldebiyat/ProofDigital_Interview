import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

interface Metric {
  'Metric Name': string;
  'Metric Count': string;
  'Week-Over-Week Change': string;
  'Percentile': string;
}

const SitePerformance: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/performance')
      .then((response) => response.json())
      .then((data) => setMetrics(data))
      .catch((error) => console.error('Error fetching performance data:', error));
  }, []);

  return (
    <div className="performance">
      <div className="card-container">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          metricName={metric['Metric Name']}
          metricCount={parseFloat(metric['Metric Count'])}
          percentile={parseFloat(metric['Percentile'])}
          weekOverWeekChange={parseFloat(metric['Week-Over-Week Change'])}
        />
      ))}
      </div>
    </div>
  );
};

export default SitePerformance;