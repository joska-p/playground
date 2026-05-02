import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { UsageRecord } from "../tracking/types.js";

interface D3ChartProps {
  data: Record<string, number>;
  width?: number;
  height?: number;
  title?: string;
}

export function D3PieChart({ data, width = 400, height = 300, title }: D3ChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || Object.keys(data).length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const pie = d3.pie<[string, number]>().value((d: [string, number]) => d[1]);

    const arc = d3
      .arc<d3.PieArcDatum<[string, number]>>()
      .innerRadius(0)
      .outerRadius(Math.min(chartWidth, chartHeight) / 2);

    const color = d3.scaleOrdinal<number, string>(d3.schemeCategory10);

    const entries = Object.entries(data);
    const arcs = pie(entries);

    const chart = g
      .append("g")
      .attr("transform", `translate(${chartWidth / 2},${chartHeight / 2})`);

    chart
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i: number) => color(i))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Legend
    const legend = g.append("g").attr("transform", `translate(${chartWidth - 100}, 0)`);

    entries.forEach(([key]: [string, number], i: number) => {
      const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`);

      legendRow.append("rect").attr("width", 15).attr("height", 15).attr("fill", color(i));

      legendRow.append("text").attr("x", 20).attr("y", 12).text(key).attr("font-size", "12px");
    });
  }, [data, width, height]);

  return (
    <div>
      {title && <h3 className="mb-2 text-lg font-bold">{title}</h3>}
      <svg ref={ref} />
    </div>
  );
}

export function D3BarChart({ data, width = 400, height = 300, title }: D3ChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || Object.keys(data).length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const entries = Object.entries(data);
    const x = d3
      .scaleBand()
      .domain(entries.map(([key]) => key))
      .range([0, chartWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(entries, (d) => d[1]) || 0])
      .nice()
      .range([chartHeight, 0]);

    const color = d3.scaleOrdinal<number, string>(d3.schemeCategory10);

    g.selectAll(".bar")
      .data(entries)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[0])!)
      .attr("y", (d) => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => chartHeight - y(d[1]))
      .attr("fill", (_, i: number) => color(i));

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    g.append("g").call(d3.axisLeft(y));
  }, [data, width, height]);

  return (
    <div>
      {title && <h3 className="mb-2 text-lg font-bold">{title}</h3>}
      <svg ref={ref} />
    </div>
  );
}

export function D3LineChart({
  records,
  width = 600,
  height = 300,
  title,
}: {
  records: UsageRecord[];
  width?: number;
  height?: number;
  title?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || records.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Group by date
    const byDate = d3.group(records, (d: UsageRecord) => d.timestamp.split("T")[0]);
    const data = Array.from(byDate, ([date, recs]) => ({
      date: date || "",
      cost: recs.reduce((sum: number, r: UsageRecord) => sum + r.cost, 0),
    })).sort((a, b) => (a.date || "").localeCompare(b.date || ""));

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.date))
      .range([0, chartWidth])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.cost) || 0])
      .nice()
      .range([chartHeight, 0]);

    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => x(d.date)!)
      .y((d) => y(d.cost));

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", line);

    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date)!)
      .attr("cy", (d) => y(d.cost))
      .attr("r", 4)
      .attr("fill", "#3b82f6");

    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    g.append("g").call(d3.axisLeft(y));
  }, [records, width, height]);

  return (
    <div>
      {title && <h3 className="mb-2 text-lg font-bold">{title}</h3>}
      <svg ref={ref} />
    </div>
  );
}
