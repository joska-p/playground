import { Chart } from './Chart';
import { lerp, remap } from './helpers';

const chartStyles = {
  basic: 'grey',
  sport: 'red'
};

type Sample = {
  id: number;
  type: 'basic' | 'sport';
  point: [number, number];
};

const samples: Sample[] = [];

for (let i = 0; i < 100; i++) {
  const type = Math.random() < 0.5 ? 'basic' : 'sport';
  const km = lerp(3000, 300000, Math.random());
  const price =
    remap(3000, 300000, 9000, 900, km) +
    lerp(-2000, 2000, Math.random()) +
    (type === 'basic' ? 0 : 5000);
  samples.push({
    id: i,
    type,
    point: [km, price]
  });
}

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
          data={samples.map((sample) => sample.point)}
        />
      </div>
    </div>
  );
}

export { MockDataTable };
