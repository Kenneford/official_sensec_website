import PropTypes from "prop-types";

export default function CustomPieChartLegend({ payload }) {
  console.log(payload);

  const totalValue = payload?.reduce(
    (acc, cur) => acc + (cur.payload.value || 0),
    0
  );

  return (
    <ul
      style={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
      }}
    >
      {payload?.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{
            color: entry.color,
            fontSize: ".8em",
            textAlign: "center",
          }}
        >
          {entry.value}: {entry.payload.value || 0} (
          {totalValue > 0
            ? ((entry.payload.value / totalValue) * 100).toFixed(1)
            : 0}
          %)
        </li>
      ))}
    </ul>
  );
}

CustomPieChartLegend.propTypes = {
  payload: PropTypes.array,
};
