import { Chart } from './Chart';
import type { Sample } from './mockDataSamples';
import { samples } from './mockDataSamples';

export type { Sample };

const chartStyles = {
  basic: 'grey',
  sport: 'red'
};

function MockDataTable() {
  return (
    <div className="relative flex h-full min-h-0 space-y-4 overflow-y-auto">
      <table className="w-1/2 table-auto text-left">
        <thead className="bg-surface sticky top-0">
          <tr>
            <th>id</th>
            <th>type</th>
            <th>mileage in km</th>
            <th>price in euro</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr key={sample.id}>
              <td>{sample.id}</td>
              <td>{sample.type}</td>
              <td>{sample.point[0].toFixed(2)}</td>
              <td>{sample.point[1].toFixed()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sticky top-0 w-1/2">
        <Chart
          styles={chartStyles}
          xAxes="km"
          yAxes="price"
          samples={samples}
        />
      </div>
    </div>
  );
}

export { MockDataTable };
