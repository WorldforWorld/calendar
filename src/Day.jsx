const Day = ({ day, className }) => {
  if (className.title === "") {
    return <td className={className.day}>{day > 0 ? day : ""}</td>;
  } else {
    return (
      <td className={className.day} data-title={className.title}>
        {day > 0 ? day : ""}
      </td>
    );
  }
};

export default Day;
