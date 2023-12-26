import { PropTypes, func } from "prop-types";

function Filter(props) {
  const { value, onChange } = props;

  return (
    <label>
      Search person: &nbsp;
      <input value={value} onChange={onChange} type="text" />
    </label>
  );
}

export default Filter;
